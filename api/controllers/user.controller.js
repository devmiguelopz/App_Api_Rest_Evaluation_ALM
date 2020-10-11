const { ObjectID } = require("mongodb");
const User = require("../models/user.model");
const apiResponse = require("../utils/apiResponse");
const UserDtoFactory = require("../dtos/user.dto");

exports.userList = async (_, response) => {
  try {
    const userCollection = await User.find();
    const objMapResponse = {
      [true]: (response, userCollection) => apiResponse.successResponseWithData(response, "Operation success", new UserDtoFactory(userCollection)),
      [false]: (response) => apiResponse.successResponseWithData(response, "Operation success no data", [])
    }
    console.info(userCollection);
    return objMapResponse[!!userCollection.length](response, userCollection);
  } catch (error) {
    return apiResponse.errorResponse(response, error.message);
  }
}

exports.userDetail = async (request, response) => {
  try {
    const user = await User.findById(ObjectID(request.params.id));
    const objMapResponse = {
      [true]: (response, user) => apiResponse.successResponseWithData(response, "Operation success", new UserDtoFactory(user)),
      [false]: (response) => apiResponse.successResponseWithData(response, "Operation success no data", {})
    }
    return objMapResponse[!!user._id](response, user);
  } catch (error) {
    return apiResponse.errorResponse(response, error.message);

  }
}

exports.userAdd = async (request, response) => {
  try {
    const objMapResponse = {
      [true]: response => apiResponse.successResponse(response, "Operation created success"),
      [false]: response => apiResponse.errorResponse(response, "Operation created error")
    }
    const userDb = new User(request.body);
    return await validateNoIsUser(request, response) && await (async (objMapResponse, response) => {
      const createdUser = await userDb.save();
      objMapResponse[!!createdUser._id](response);
    })(objMapResponse, response)
  } catch (error) {
    return apiResponse.errorResponse(response, error.message);
  }
}

exports.userUpdate = async (request, response) => {
  try {
    const objMapResponse = {
      [true]: response => apiResponse.successResponse(response, "Operation updated success"),
      [false]: response => apiResponse.errorResponse(response, "Operation updated error")
    }
    return await validateNoIsUser(request, response) && await (async (objMapResponse, request, response) => {
      const updatedUser = await User.updateOne({ _id: ObjectID(request.params.id) }, { $set: request.body, }, { runValidators: true });
      objMapResponse[!!updatedUser.ok && !!updatedUser.n](response)
    })(objMapResponse, request, response)
  } catch (error) {
    return apiResponse.errorResponse(response, error.message);
  }
}

exports.userDelete = async (request, response) => {
  try {
    const deletedUserAction = await User.deleteOne({ _id: ObjectID(request.params.id) })
    const objMapResponse = {
      [true]: (response, _) => apiResponse.successResponse(response, "Operation deleted success"),
      [false]: (response, error) => apiResponse.errorResponse(response, "Operation deleted error")
    }
    return objMapResponse[!!deletedUserAction.ok && !!deletedUserAction.deletedCount](response, deletedUserAction);
  } catch (error) {
    return apiResponse.errorResponse(response, error);
  }
}

const validateNoIsUser = async (request, response) => {
  try {
    let exist = false;
    const objMapResponse = {
      [true]: (response, identificationDocument) => apiResponse.validationErrorWithData(response, " A registered user identification document already exists", identificationDocument),
      [false]: () => { exist = true }
    }

    const user = await User.findOne({ identificationDocument: request.body.identificationDocument }).exec();
    objMapResponse[!!(user && user.id !== request.params.id)](response, request.body.identificationDocument);
    return exist
  } catch (error) {
    apiResponse.errorResponse(response, error.message);
    return false;
  }
}
