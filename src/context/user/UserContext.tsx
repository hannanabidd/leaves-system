import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface IDataProps {
  email: string;
  id: string;
  name?: string;
  organizationId?: string;
}

interface IUser {
  user: IDataProps;
  setUser?: Dispatch<SetStateAction<IDataProps>>;
}

export const UserContext = createContext<IUser>({
  user: {
    email: "",
    id: "",
    name: "",
    organizationId: "",
  },
});

interface IProps {
  children: React.ReactNode;
}

const UserProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IDataProps>({
    email: "",
    id: "",
    name: "",
    organizationId: "",
  });
  // console.log("data in context", data);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
