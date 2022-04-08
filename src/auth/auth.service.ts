import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  registerUser(registerRequest: {
    username: string;
    password: string;
    email: string;
  }) {
    const { username, password, email } = registerRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        username,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (error, result) => {
          if (!result) {
            reject(error);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  authenticateUser(user: { username: string; password: string }) {
    const { username, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  confirmUser(user: { username: string; confirmationCode: string }) {
    const { username, confirmationCode } = user;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(
        confirmationCode,
        true,
        function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  forgotPassword(user: { username: string }) {
    const { username } = user;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  confirmForgotPassword(user: {
    username: string;
    confirmationCode: string;
    newPassword: string;
  }) {
    const { username, confirmationCode, newPassword } = user;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(confirmationCode, newPassword, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async resetPassword(user: {
    username: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const { username, oldPassword, newPassword } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: oldPassword,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      newUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          newUser.changePassword(
            oldPassword,
            newPassword,
            function (err, result) {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve(result);
              }
            },
          );
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
