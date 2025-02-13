export enum Rol {
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface AuthServiceInterface {
  signIn(email: string, password: string): Promise<any>
  signUp(email: string, password: string): Promise<any>
  signOut(): Promise<void>
  onAuthStateChanged(callback: (user: any) => void): () => void
  getCurrentUser(): any | null
  getCurrentUser(): any | null
  getUserRoles(user: any): Promise<Rol[]>;
}