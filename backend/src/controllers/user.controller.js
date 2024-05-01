import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"


/* =========== Generate Access And Refresh Token ===========*/
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token.")
  }
}

/* ============== Register User================= */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body
  console.log(firstName);

  if ([firstName, lastName, username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] })

  if (existedUser) throw new ApiError(400, "User with email or username already exists")

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering new user")
  }

  return res.status(200).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

})

/* ============== Login User================= */
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username) {
    throw new ApiError(400, "Either username or email required.")
  }

  const user = await User.findOne({ username })

  if (!user) {
    throw new ApiError(404, "User doesnot exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password.")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)


  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "User logged In successfully"
      )
    )
})

/* ============== Logout User================= */
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  )
  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const getCurrentUser = asyncHandler((req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
      ))
})


export {
  registerUser,
  loginUser,
  logout,
  getCurrentUser
}