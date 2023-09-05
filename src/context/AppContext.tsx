import { ReactNode, createContext, useEffect, useState } from 'react'
import SaleInterface from '../interfaces/SaleInterface';
import LoginInterface from '../interfaces/LoginInterface';
import UserInterface from '../interfaces/UserInterface';
type AppContextProps = {
  children: ReactNode
}
type AppContextType = {
  user: UserInterface,
  login: (login: string, password: string) =>  Promise<void | boolean>
  getUser: () => Promise <void>
  saveSale: (sale: SaleInterface) => Promise <void | boolean>
  getSale: (saleId: number) => Promise <void | SaleInterface>
  getSales: () => Promise <SaleInterface[]>
}

const urlApi = 'https://d1d1-187-94-15-254.ngrok.io/api'

export const AppContext = createContext<AppContextType>(null);

export const AppContextProvider = ( { children } : AppContextProps) => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<UserInterface>()
  const headers = { 'Authorization': `Bearer ${token}` };
  const getUser = async () : Promise<void> => {
    fetch(`${urlApi}/user`,{
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authentication: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(json => {
      return json.movies;
    })
    .catch(error => {
      console.error(error);
    });
  }

  const login = async (email: string, password: string) : Promise<void | boolean> => {
    const data = await fetch(`${urlApi}/login`,{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      }

      if(response.status === 401) {
        alert('Usuário ou Senha errado.')
        return
      }

      if(response.status === 403) {
        alert('A versão mobile é apenas para vendedores.')
        return
      }
    })
    .then(json => {
      if(json != null) {
        setToken(json.access_token)
        setUser(json.user)
        return true;
      } else {
        return
      }
    })
    .catch(error => {
      console.error(error);
      return
    });

    return data

  }

  const getSales = async (): Promise<SaleInterface[]> => {
    const data = await fetch(`${urlApi}/sales`,{headers})
    .then(response =>{
      return response.json()
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });

    return data
  }

  const getSale = async (saleId: number) : Promise<void | SaleInterface> => {
    fetch(`${urlApi}/`,{
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authentication: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(json => {
      return json.movies;
    })
    .catch(error => {
      console.error(error);
    });
  }

  const saveSale = async (sale: SaleInterface) : Promise<void | boolean> => {
    const data = await fetch(`${urlApi}/`, {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authentication: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(json => {
      return true
    })
    .catch(error => {
      console.error(error);
      return
    });

    return data
  }

  return(
    <AppContext.Provider
      value={{
        saveSale,
        user,
        getSale,
        getSales,
        login,
        getUser
      }}
    >
    {children}
    </AppContext.Provider>
    )
}
