module.exports = class UserFactory {
  constructor(userModelGeneric) {
    if (Array.isArray(userModelGeneric)) {
      return new UserCollection(userModelGeneric).Collection;
    }
    return new User(userModelGeneric);
  }

}

const UserCollection = class {
  constructor(userModelCollection) {
    this.Collection = [];
    this.GetCollection(userModelCollection);
  }

  GetCollection(userModelCollection) {
    this.Collection = userModelCollection.map(userModel => {
      return new User(userModel);
    });
  }

}

const User = class {
  constructor(objUserModel = {
    fullName:"",
    identificationDocument:"",
    cellPhone:"",
    email:""
  }) {
    this.fullName = objUserModel.fullName;
    this.identificationDocument = objUserModel.identificationDocument;
    this.cellPhone = objUserModel.cellPhone;
    this.email = objUserModel.email;

  }
}
