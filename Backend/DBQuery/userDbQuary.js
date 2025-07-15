import DevError from "../errors/devError.js";
import User from "../models/userSchema.js";

/**
 * Finds a user in the database by their email address.
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<User | false>} A promise that resolves with the user object if found, 
 * or false if an error occurs or the user is not found.
 */
export const findUserByEmail = async (email, options = {}) => {
    if(!email) throw new DevError("email can't be undefined.")
    try {
        const query = User.findOne({ email: email })
        
        // add session if session has passed as option
        if (options.session) {
            query.session(options.session)
        }
        const user = await query;
        return user
    } catch (error) {
        throw new DevError(error)
    }
}