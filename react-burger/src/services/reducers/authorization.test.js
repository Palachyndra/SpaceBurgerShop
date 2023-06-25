import { authReducer } from './authorization'
import { GET_TOKEN, EXIT_AUTH } from '../../constants/authorization';
import { authorization, authorizationName, authorizationEmail, authorizationPassword, refreshToken, accessToken } from '../initialData';

const initialState = {
  authorizationName,
  authorizationEmail,
  authorizationPassword,
  accessToken,
  refreshToken,
  authorization,
};

test('should return the initialState', () => {
  expect(authReducer(undefined, { type: undefined })).toEqual(initialState)
})

test('GET_TOKEN', () => {
  const payload = { ...initialState, accessToken: 'afsd', refreshToken: 'asd' }
  expect(authReducer(initialState, { type: GET_TOKEN, payload })).toEqual(payload)
})

test('EXIT_AUTH', () => {
  const payload = { ...initialState, authorization: false }
  expect(authReducer(initialState, { type: EXIT_AUTH, payload })).toEqual(payload)
})