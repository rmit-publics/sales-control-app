import UserInterface from "./UserInterface"

export default interface LoginInterface {
  access_token: string
  user: UserInterface
  token_type: string
}