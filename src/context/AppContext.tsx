import { ReactNode, createContext, useState } from 'react'
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

const urlApi = 'https://4e12-187-94-15-254.ngrok.io/api'

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
    const data = await fetch(`${urlApi}/sale/${saleId}`,{headers})
    .then(response =>{
      return response.json()
    })
    .then(json => {
      console.log('data api',json)
      return json;
    })
    .catch(error => {
      console.error(error);
    });

    return data
  }

  const saveSale = async (sale: SaleInterface) : Promise<void | boolean> => {
    let formData = new FormData();
    formData.append('product', sale.product);
    formData.append('date', sale.date);
    formData.append('time', sale.time);
    formData.append('amount', sale.amount+'');
    formData.append('lat', sale.lat+'');
    formData.append('lng', sale.lng+'');
    const data = await fetch(`${urlApi}/sale`, {
      method: 'POST',
      headers,
      body: formData,
    })
    .then(response =>{
      console.log('response', response)
      if(response.status === 200) {
        response.json()
      } else {
        return false
      }
    })
    .then(json => {
      console.log(json)
      return true
    })
    .catch(error => {
      console.error(error);
      return false
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
