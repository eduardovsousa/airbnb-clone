'use client';

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
          hidden
          md:block
          text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer"
        >
          Anuncie seu espaço no Airbnb
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Viagens" />
                <MenuItem onClick={() => {}} label="Favoritos" />
                <MenuItem onClick={() => {}} label="Reservas" />
                <MenuItem onClick={() => {}} label="Propriedades" />
                <MenuItem onClick={rentModal.onOpen} label="Minha casa Airbnb" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Sair" />
              </>
            ) : (
              <>
                <MenuItem onClick={registerModal.onOpen} label="Cadastrar-se" />
                <MenuItem onClick={loginModal.onOpen} label="Entrar" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
