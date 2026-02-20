import { useState, useRef, useEffect } from 'react'
import './Agents.css'

export default function Agents() {
    const [messages, setMessages] = useState([
        { type: 'user', text: 'Thinking of buying that ₹80k gaming laptop on EMI. Good idea?' },
        { type: 'agent wolf', text: '🐺 The Wolf (Market Analyst)\n\nFinancially feasible.\n12-month EMI is ₹7,200.\nYour freelance income covers this.', isAgent: true, name: 'The Wolf', role: 'Market Analyst', color: 'green' },
        { type: 'agent sage', text: '🧘 The Sage (Behavioral Coach)\n\nWarning: This purchase delays your Europe trip goal by 5 months.\nHigh probability of buyer’s regret.', isAgent: true, name: 'The Sage', role: 'Behavioral Coach', color: 'red' }
    ])
    const [input, setInput] = useState('')
    const chatEndRef = useRef(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(scrollToBottom, [messages])

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMsg = { type: 'user', text: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')

        try {
            const res = await fetch("http://localhost:5001/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            })

            if (!res.ok) throw new Error('Server error')

            const data = await res.json()

            setMessages(prev => [
                ...prev,
                { type: 'agent wolf', text: `🐺 Wolf: ${data.wolf}`, isAgent: true, name: 'The Wolf', role: 'Market Analyst', color: 'green' },
                { type: 'agent sage', text: `🧘 Sage: ${data.sage}`, isAgent: true, name: 'The Sage', role: 'Behavioral Coach', color: 'red' }
            ])
        } catch (err) {
            setMessages(prev => [...prev, { type: 'system', text: "❌ Server error. Ensure backend is running on port 5001." }])
        }
    }

    return (
        <div className="agents-page">
            <header className="agents-topbar">
                <h3>Agent Team</h3>
                <p className="agents-subtitle">Your AI-powered financial advisors</p>
            </header>

            <section className="chat" id="chatArea">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.type}`}>
                        {msg.isAgent ? (
                            <>
                                <div className="agent-name">{msg.name ? `${msg.name} (${msg.role})` : ''}</div>
                                <div className={`agent-card ${msg.color || ''}`}>
                                    {msg.text.replace(msg.name ? '' : '', '')}
                                </div>
                            </>
                        ) : (
                            msg.text
                        )}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </section>

            <div className="chat-bar">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask FinSync AI..."
                />
                <button onClick={sendMessage}>➤</button>
            </div>
        </div>
    )
}
