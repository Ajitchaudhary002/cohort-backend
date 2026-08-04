import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {

    const chat = useChat()

    const { user } = useSelector(state => state.auth)
    console.log(user)

    useEffect(() => {
        chat.initializeSocketConnection()
    }, [])

    return (

        <div className="h-screen bg-[#1f1f1f] text-white p-5">
            <div className="h-full rounded-3xl border border-violet-500/40 bg-[#242424] flex gap-6 p-6">

                {/* Sidebar */}
                <aside className="w-72 bg-[#3a3a3a] rounded-3xl flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h1 className="text-3xl font-semibold">Perplexity</h1>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="bg-white/5 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition"
                            >
                                <p className="text-sm text-gray-300 truncate">
                                    Previous Chat {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="p-4">
                        <button className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 py-3 font-medium transition">
                            + New Chat
                        </button>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 flex flex-col">

                    {/* User Message Bubble */}
                    <div className="flex justify-end mb-5">
                        <div className="bg-[#4b4b4b] px-8 py-4 rounded-2xl text-lg">
                            User Message
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex-1 bg-[#454545] rounded-[30px] p-8 overflow-y-auto shadow-inner">
                        <div className="max-w-3xl mx-auto">

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center font-bold">
                                    AI
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-3">
                                        AI Response
                                    </h2>

                                    <p className="text-gray-300 leading-8">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Quibusdam magni voluptate expedita officia reprehenderit
                                        aliquid porro eos laboriosam dolores. Repellendus deserunt
                                        minima, quisquam molestiae magni impedit doloremque
                                        consequatur distinctio autem.
                                    </p>

                                    <p className="text-gray-300 mt-4 leading-8">
                                        This area will scroll when the response becomes longer.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Input */}
                    <div className="mt-6">
                        <div className="bg-[#4a4a4a] rounded-full flex items-center px-6 py-3">

                            <input
                                type="text"
                                placeholder="Ask anything..."
                                className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-300"
                            />

                            <button className="bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded-full text-lg font-medium transition">
                                Send
                            </button>

                        </div>
                    </div>

                </main>

            </div>
        </div>

    )
}

export default Dashboard
