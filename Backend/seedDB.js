import mongoose from "mongoose";
import 'dotenv/config'
import User from "./models/userSchema.js";
import Task from "./models/taskSchema.js";
import Board from "./models/boardSchema.js";
import ActivityLog from "./models/activityLogSchema.js";
import { HashPassword } from "./helper/bcryptHelper.js";
import { findUserByEmail } from "./DBQuery/userDbQuary.js";
import toMongoObjectId from "./utils/toMongoObjectId.js";

const MONGO_URL = process.env.MONGO_URL
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD

const seedDatabase = async () => {
    // conecting DB
    await mongoose.connect(MONGO_URL)
        .then(() => {
            console.log('Database conected for seeding...')
        })
        .catch((err) => {
            console.log(`Database connection error: ${err.message}`)
            process.exit(0);
        })

    // create mongodb session
    const session = await mongoose.startSession()
    // start the mongodb transaction
    session.startTransaction();

    try {

        const user = await User.find()
        const task = await Task.find()
        const board = await Board.find()
        const activityLog = await ActivityLog.find()

        // create test user
        let testUser;

        if (user.length > 0) {
            testUser = await findUserByEmail(TEST_USER_EMAIL, { session })
        } else {
            testUser = new User({
                name: 'test user',
                email: TEST_USER_EMAIL,
                password: await HashPassword(TEST_USER_PASSWORD),
            })
            await testUser.save({session})
        }
        const testUserId = testUser._id.toString()

        // create test board
        let testBoard;
        let testBoardId;

        if (board.length < 1) {
            testBoard = new Board({
                name: 'Test Board',
                description: 'This Board is for test Tasky and this is created by database seeding.',
                createdBy: toMongoObjectId(testUserId),
                admins: [toMongoObjectId(testUserId)],
                canEdit: [toMongoObjectId(testUserId)],
            })
            testBoard = await testBoard.save({ session })
            testBoardId = testBoard._id.toString()
        } else {
            testBoard = await Board.findOne({ createdBy: testUserId }).sort({ createdAt: 1 }).session(session)
            testBoardId = testBoard._id.toString()
        }

        // create test task
        let testTask;
        let testTaskId;

        if (task.length < 1) {
            testTask = new Task({
                title: 'Test Tasky task',
                description: 'Task is to test Tasky, this task is created by database seeding.',
                boardId: toMongoObjectId(testBoardId),
                assignedTo: toMongoObjectId(testUserId),
                createdBy: toMongoObjectId(testUserId),
                lastEditedBy: toMongoObjectId(testUserId),
                priority: "High",
                status: "Todo",
                position: await Task.aggregate([{ $group: { _id: "position" } }, { $sort: { position: -1, } }, { $limit: 1 }])?.position || 0,
            })
            testTask = await testTask.save({ session })
            testTaskId = testTask._id.toString()
        } else {
            testTask = await Task.findOne({ boardId: toMongoObjectId(testBoardId) }).sort({ createdAt: 1 }).session(session)
            testTaskId = testTask._id.toString()
        }

        // create test activity log
        let testActivityLog;

        if (activityLog.length < 1) {
            testActivityLog = new ActivityLog({
                boardId: toMongoObjectId(testBoardId),
                taskId: toMongoObjectId(testTaskId),
                userId: toMongoObjectId(testUserId),
                description: `New task(${testTask.title}) created by ${testUser.name}(${testUserId})`,
                timestamp: new Date(testTask.createdAt),
                action: 'create',
            })
            testActivityLog = await testActivityLog.save({ session })
        }

        await session.commitTransaction();

        console.log('Database seeded successfully.')
    } catch (error) {
        session.abortTransaction()
        console.log(`Database seeding faild error: ${error.message}`)
    } finally {
        await session.endSession()
        await mongoose.disconnect();
        console.log('Disconnected from database.');
        process.exit(0);
    }
}

seedDatabase()