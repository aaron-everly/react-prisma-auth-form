import { useNavigate } from "react-router-dom"

export function Home({ user, setUser }) {

    const navigate = useNavigate();
    const userJSON = JSON.parse(user).user

    function logout() {
        setUser(null)
        navigate("/login")
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-2xl font-bold sm:text-3xl text-center">
                    Welcome {userJSON.username}
                </h1>
                <p className="mt-4 text-gray-500">
                    Welcome to the homepage of this simple full-stack authentication app built with Postgres, Prisma, Express, React, and TailwindCSS.
                </p>
                <div className="my-12 text-center">
                    <button
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}