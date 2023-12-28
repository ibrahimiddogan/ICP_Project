import React, { useEffect, useState } from "react"
import { useCanister } from "@connect2ic/react"
import { useConnect } from "@connect2ic/react"
import AuthModal from "../components/AuthModal"
import { useAuthStore } from "../store/auth.store"
import Card from "../components/Card"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const { isConnected } = useConnect();
  const { isAuthModalOpen, setIsAuthModalOpen, setUserInfo } = useAuthStore();
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);

  const [backend] = useCanister("backend");

  const checkUser = async () => {
    const res = await backend.getMiUser() // TODO: check why on second connect returns empty array
    console.log("Usuario es: ", res)
    if (res?.length > 0) {
      return res[0]
    }
    return null
  }

  const verifyUser = async () => {
    const data = await checkUser()
    if (!data) {
      setIsAuthModalOpen()
    } else {
      setUserInfo(data)
    }
  }

  const fetchTutorials = async () => {
    const res = await backend.getAprovedPublication()
    console.log("Publications are: ", res)
    setTutorials(res)
  };

  const handleTutorialOpen = (id) => {
    navigate(`/tutorial/${id}`);
  }

  useEffect(() => {
    fetchTutorials()
    if (isConnected) {
      verifyUser()
    }
  }, [isConnected])

  return (
    <div className="flex flex-col p-6 min-h-[86vh]">
      {isAuthModalOpen && <AuthModal></AuthModal>}
      {isConnected ? (
        <div className="p-4">
          <div className="flex flex-row justify-between w-100">
            <h1 className="text-3xl font-bold">¿Qué quieres aprender hoy?</h1>
            <Link to={"/nuevo"} className="rounded-full bg-indigo-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Nuevo Tutorial
            </Link>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            {tutorials.map((tutorial, index) => (
              <div key={tutorial[0]} onClick={() => handleTutorialOpen(tutorial[0])}>
                <Card
                  key={tutorial[0]}
                  title={tutorial[1]?.content.title}
                  description={tutorial[1]?.content.html.slice(0, 300)}
                  author={tutorial[1]?.autor}
                  readTime={(Math.random(0,10)*2).toFixed(1)+1}
                ></Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-300 dark:hover:ring-gray-200 dark:text-gray-100">
              Parte del hackathon ICP Astro.{" "}
              <a href="https://lu.ma/session-fc4wl8w8bq6zdk37rfo8" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Ver <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-200">
              Conviértete en un experto de ICP
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-100">
              Aprende de los mejores tutores y cursos que tenemos preparado para
              ti. Publica tu propio tutorial y gana recompensas en el protocolo
              de Internet Computer.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://internetcomputer.org/docs/current/home"
                className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Conoce más
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { Home }
