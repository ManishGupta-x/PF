import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { processCommand, getTerminalPrompt, getURLContext } from '@/lib/terminalCommands'; 

const TerminalModal = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState([]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [contactState, setContactState] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingText, setTypingText] = useState('');
    const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const context = getURLContext(currentPath);
    const prompt = getTerminalPrompt(currentPath);

    
    useEffect(() => {
        const welcomeMessages = [
          
            { type: 'system', content: 'Type "help" for available commands' },
        ];
        setHistory(welcomeMessages);
    }, [context]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current && !isTyping) {
            inputRef.current.focus();
        }
    }, [isOpen, isMinimized, isTyping]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, typingText]);

    
    const typeResponse = (text, onComplete) => {
        setIsTyping(true);
        setTypingText('');
        setCurrentTypingIndex(0);

        const typeChar = (index) => {
            if (index < text.length) {
                setTypingText(prev => prev + text[index]);
                setCurrentTypingIndex(index + 1);

                
                const delay = text[index] === '\n' ? 20 :
                    text[index] === ' ' ? 10 :
                        Math.random() * 15 + 5; 

                typingTimeoutRef.current = setTimeout(() => typeChar(index + 1), delay);
            } else {
                setIsTyping(false);
                setTypingText('');
                setCurrentTypingIndex(0);
                onComplete();
            }
        };

        typeChar(0);
    };

    
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    const handleCommand = async (cmd) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        
        if (isTyping) return;

        
        const newHistory = [...history, {
            type: 'command',
            content: `${prompt}${trimmedCmd}`
        }];

        setHistoryIndex(-1);
        setCommand('');

        
        setHistory(newHistory);

        try {
            
            const response = await processCommand(trimmedCmd, context, contactState, setContactState, currentPath, router.push);

            
            if (response === "CLEAR_TERMINAL") {
                setHistory([
                    { type: 'system', content: 'Type "help" for available commands' },
                ]);
                return;
            }

            if (response === "EXIT_TERMINAL") {
                setIsOpen(false);
                return;
            }

            
            typeResponse(response, () => {
                
                if (response.startsWith('NAVIGATE:')) {
                    const targetPath = response.replace('NAVIGATE:', '');
                    setIsOpen(false); 
                    setTimeout(() => {
                        router.push(targetPath);
                    }, 100); 
                    setHistory(prev => [...prev, {
                        type: 'response',
                        content: `Navigated to dev.manishguptaji.co.in${targetPath}`
                    }]);
                } else if (response.startsWith('OPEN_RESUME:')) {
                    const resumeUrl = response.replace('OPEN_RESUME:', '');
                    window.open(resumeUrl, '_blank');
                    setHistory(prev => [...prev, {
                        type: 'response',
                        content: `Opening resume: ${resumeUrl}`
                    }]);
                } else {
                    setHistory(prev => [...prev, {
                        type: 'response',
                        content: response
                    }]);
                }
            });

        } catch (error) {
            const errorMessage = `Error: ${error.message}`;
            typeResponse(errorMessage, () => {
                setHistory(prev => [...prev, {
                    type: 'error',
                    content: errorMessage
                }]);
            });
        }
    };

    const handleKeyDown = (e) => {
        
        if (isTyping) {
            e.preventDefault();
            return;
        }

        if (e.key === 'Enter') {
            handleCommand(command);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setCommand(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setCommand('');
                } else {
                    setHistoryIndex(newIndex);
                    setCommand(commandHistory[newIndex]);
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            
            const commonCommands = ['help', 'about', 'work', 'skills', 'contact', 'clear', 'exit', 'cd'];
            const matches = commonCommands.filter(cmd => cmd.startsWith(command.toLowerCase()));
            if (matches.length === 1) {
                setCommand(matches[0]);
            }
        }
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
            
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-4 z-50 bg-dark-brown hover:bg-accent-brown text-cream p-3 rounded-full shadow-portfolio-lg transition-all duration-300 hover:scale-110 group
                   sm:bottom-24 sm:right-6 sm:p-4
                   active:scale-95 touch-manipulation"
                aria-label="Open Terminal"
            >
                <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 sm:w-6 sm:h-6" />
            </button>

            
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center backdrop-blur-md p-4 pb-28 
                        sm:items-center sm:p-6"
                    style={{
                        backgroundColor: 'rgba(45, 30, 19, 0.85)',
                    }}>
                    <div
                        className={`bg-cream border-t-2 border-dark-brown rounded-t-lg shadow-2xl transition-all duration-300 w-full
                        sm:border-2 sm:rounded-lg sm:w-11/12 sm:max-w-[95%]
                        md:w-4/5 lg:w-[95%] 
                        ${isMinimized
                                ? 'h-12 sm:h-12'
                                : 'h-5/6 min-h-96 max-h-[calc(100vh-3rem)] sm:h-[90vh] sm:max-h-[80vh] '
                            }`}
                    >
                        
                        <div className="flex items-center justify-between bg-dark-brown text-cream px-3 py-2 rounded-t-lg
                            sm:px-4 sm:py-2">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="text-xs sm:text-lg font-iceland">
                                    Portfolio Terminal - {context}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                    onClick={toggleMinimize}
                                    className="hover:bg-accent-brown p-1 rounded transition-colors touch-manipulation
                            active:scale-95"
                                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                                >
                                    {isMinimized ? <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="hover:bg-red-600 p-1 rounded transition-colors touch-manipulation
                            active:scale-95"
                                    aria-label="Close Terminal"
                                >
                                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>

                        
                        {!isMinimized && (
                            <div className="flex flex-col h-full font-quantico">
                                
                                <div
                                    ref={terminalRef}
                                    className="flex-1 bg-cream p-3 overflow-y-auto text-xs text-dark-brown
                            sm:p-4 sm:text-sm
                            min-h-0"
                                    style={{
                                        minHeight: '200px',
                                        WebkitOverflowScrolling: 'touch'
                                    }}
                                >
                                    {history.map((entry, index) => (
                                        <div key={index} className="mb-1 break-words">
                                            {entry.type === 'system' && (
                                                <div className="text-brown opacity-80">
                                                    {entry.content}
                                                </div>
                                            )}
                                            {entry.type === 'command' && (
                                                <div className="text-dark-brown font-bold">
                                                    {entry.content}
                                                </div>
                                            )}
                                            {entry.type === 'response' && (
                                                <div className="text-dark-brown whitespace-pre-line ml-2">
                                                    {entry.content}
                                                </div>
                                            )}
                                            {entry.type === 'error' && (
                                                <div className="text-red-600 whitespace-pre-line ml-2">
                                                    {entry.content}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    
                                    {isTyping && (
                                        <div className="mb-1 break-words">
                                            <div className="text-dark-brown whitespace-pre-line ml-2">
                                                {typingText}
                                                <span className="animate-pulse">▋</span>
                                            </div>
                                        </div>
                                    )}

                                    
                                    {contactState && contactState.mode === 'interactive' && (
                                        <div className="text-blue-600 text-xs opacity-70 mt-2">
                                            📝 Contact form active - Step {contactState.step + 1}/5
                                        </div>
                                    )}
                                </div>

                                
                                <div className="bg-cream border-t border-dark-brown p-3 sm:p-4">
                                    <div className="flex md:items-center items-start gap-2 md:flex-row flex-col ">
                                        <span className="text-dark-brown font-mono font-bold text-xs sm:text-sm flex-shrink-0">
                                            {contactState && contactState.mode === 'interactive' ? '>' : prompt.split('$ ')[0] + '$ '}
                                        </span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={command}
                                            onChange={(e) => setCommand(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="flex-1 bg-transparent text-dark-brown font-quantico  border border-brown/40 p-1 text-xs outline-brown placeholder-brown placeholder-opacity-50 w-full 
                                sm:text-sm"
                                            placeholder={contactState && contactState.mode === 'interactive' ? "Enter your response..." : "Enter command..."}
                                            autoComplete="off"
                                            spellCheck="false"
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            disabled={isTyping}
                                            style={{ opacity: isTyping ? 0.5 : 1 }}
                                        />
                                    </div>

                                    
                                    <div className="text-xs text-brown opacity-60 mt-2">
                                        <div className="sm:hidden">
                                            {isTyping ? "⌨️ Typing..." : "Tip: Type \"help\" for commands"}
                                        </div>
                                        <div className="hidden sm:block">
                                            {isTyping ? "⌨️ Response typing..." : "Commands: help | about | work | skills | contact | clear | exit | cd"}
                                            {contactState && contactState.mode === 'interactive' && !isTyping && (
                                                <span className="ml-4 text-blue-600">📝 Contact form in progress</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default TerminalModal;