import bcrypt from 'bcrypt'
import AppError from '../errors/appError.js'
import DevError from '../errors/devError.js'

/**
 * Hashes a plain text password using bcrypt with a salt factor of 10.
 * @param {string} plainTextPassword - The plain text password to be hashed.
 * @returns {string} The hashed password.
 * @throws {Error} If an error occurs during the hashing process.
 */
export const HashPassword = async (plainTextPassword) => {
    if (!plainTextPassword) throw new DevError("plianTextPasswrod can't be undefined.")
    try {
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10)
        return hashedPassword
    } catch (error) {
        throw new DevError(error)
    }
}


/**
 * Compares a plain text password with a hashed password using bcrypt.
 * @param {string} plainTextPassword - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {boolean} A boolean indicating whether the passwords match.
 * @throws {Error} If there is an error during the comparison process.
 */
export const matchPassword = async (plainTextPassword, hashedPassword) => {
    if(!plainTextPassword || !hashedPassword) throw new DevError("PlainTextPassword can't be undefined.")
    try {
        const matched = await bcrypt.compare(plainTextPassword, hashedPassword)
        return matched
    } catch (error) {
        throw new DevError(error)
    }
}