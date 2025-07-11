// terminalCommands.js - Terminal Commands Data Structure
import { workData, aboutData, smallProjectsData, skillCategories, pcSpecs, achievements } from './data';

// Helper function to get current URL context
export const getURLContext = (pathname) => {
    if (pathname === '/') return 'portfolio';
    if (pathname === '/GamingCareer') return 'gaming';
    if (pathname === '/SmallProjects') return 'projects';
    return 'portfolio';
};

// Get priority commands based on current URL
export const getPriorityCommands = (context) => {
    const priorities = {
        portfolio: ['about', 'work', 'skills', 'contact'],
        gaming: ['pcspecs', 'clips', 'gaming-setup'],
        projects: ['smallprojects', 'github', 'tech-stack']
    };
    return priorities[context] || priorities.portfolio;
};

// Terminal Commands Data Structure
export const terminalCommands = {
    // Navigation Commands
    help: {
        description: "Show available commands",
        usage: "help [command]",
        category: "navigation",
        execute: (args, context) => {
            if (args.length > 0) {
                const cmd = args[0];
                if (terminalCommands[cmd]) {
                    return `${cmd} - ${terminalCommands[cmd].description}\nUsage: ${terminalCommands[cmd].usage}`;
                } else {
                    return `Command not found: ${cmd}`;
                }
            }

            const priorityCommands = getPriorityCommands(context);
            const basicCommands = ['help', 'clear', 'whoami', 'pwd', 'cd'];

            let output = "Available commands:\n\n";
            output += "=== Priority Commands (for current page) ===\n";
            priorityCommands.forEach(cmd => {
                if (terminalCommands[cmd]) {
                    output += `  ${cmd.padEnd(15)} - ${terminalCommands[cmd].description}\n`;
                }
            });

            output += "\n=== Basic Commands ===\n";
            basicCommands.forEach(cmd => {
                if (terminalCommands[cmd]) {
                    output += `  ${cmd.padEnd(15)} - ${terminalCommands[cmd].description}\n`;
                }
            });

            output += "\n=== Data Commands ===\n";
            ['work', 'about', 'skills', 'smallprojects', 'pcspecs','pc'].forEach(cmd => {
                if (terminalCommands[cmd]) {
                    output += `  ${cmd.padEnd(15)} - ${terminalCommands[cmd].description}\n`;
                }
            });

            output += "\n=== Utility Commands ===\n";
            ['contact', 'resume', 'social'].forEach(cmd => {
                if (terminalCommands[cmd]) {
                    output += `  ${cmd.padEnd(15)} - ${terminalCommands[cmd].description}\n`;
                }
            });

            output += "\nTip: Use 'help [command]' for detailed usage information";
            return output;
        }
    },

    cd: {
        description: "Change directory (navigate to different pages)",
        usage: "cd [directory] | cd .. | cd ~",
        category: "navigation",
        execute: (args, context, setContactState, pathname, navigate) => {
            if (args.length === 0) {
                return `Current directory: dev.manishguptaji.co.in${pathname}\n\nAvailable directories:\n  /             - Home/Portfolio\n  /GamingCareer - Gaming content and PC specs\n  /SmallProjects - Small projects showcase\n  ..            - Go back\n  ~             - Go home`;
            }

            const target = args[0];
            const availableRoutes = {
                '/': '/',
                'home': '/',
                '~': '/',
                'GamingCareer': '/GamingCareer',
                'gaming': '/GamingCareer',
                'SmallProjects': '/SmallProjects',
                'projects': '/SmallProjects',
                'smallprojects': '/SmallProjects',
                'work': '/Work',
                'skills': '/Skills',

            };



            // Handle going back (..)
            if (target === '..') {
                if (pathname === '/') {
                    return "Already at root directory";
                } else {
                    return "NAVIGATE:/";
                }
            }

            // Handle home navigation (~ or home) - always navigate, don't check current location
            if (target === '~' || target === 'home') {
                return "NAVIGATE:/";
            }

            // Handle absolute paths (starting with /)
            if (target.startsWith('/')) {
                const cleanPath = target === '/' ? '/' : target;
                if (Object.values(availableRoutes).includes(cleanPath)) {
                    if (cleanPath === pathname) {
                        return `Already in directory: dev.manishguptaji.co.in${cleanPath}`;
                    }
                    return `NAVIGATE:${cleanPath}`;
                } else {
                    return `Directory not found: ${target}\n\nAvailable directories:\n  /             - Home/Portfolio\n  /GamingCareer - Gaming content\n  /SmallProjects - Projects showcase`;
                }
            }

            // Handle relative paths and aliases
            if (availableRoutes[target]) {
                const targetPath = availableRoutes[target];
                if (targetPath === pathname) {
                    return `Already in directory: dev.manishguptaji.co.in${targetPath}`;
                }
                return `NAVIGATE:${targetPath}`;
            }

            return `Directory not found: ${target}\n\nAvailable directories:\n  /             - Home/Portfolio\n  /GamingCareer - Gaming content\n  /SmallProjects - Projects showcase\n  ..            - Go back\n  ~             - Go home`;
        }
    },

    clear: {
        description: "Clear terminal screen",
        usage: "clear",
        category: "navigation",
        execute: () => "CLEAR_TERMINAL"
    },

    whoami: {
        description: "Display current user information",
        usage: "whoami",
        category: "navigation",
        execute: () => "manish-gupta\nSoftware Engineer | Full-Stack Developer | Problem Solver"
    },

    pwd: {
        description: "Print working directory",
        usage: "pwd",
        category: "navigation",
        execute: (args, context, setContactState, pathname) => {
            return `dev.manishguptaji.co.in${pathname}`;
        }
    },


    about: {
        description: "Display information about Manish Gupta",
        usage: "about [--brief]",
        category: "personal",
        execute: (args) => {
            if (args.includes('--brief')) {
                return aboutData.content.paragraphs[0].text;
            }

            let output = "=== About Manish Gupta ===\n\n";
            aboutData.content.paragraphs.forEach((para, index) => {
                if (para.link) {
                    output += `${para.text} ${para.link.text} (${para.link.url})${para.continuation}\n\n`;
                } else {
                    output += `${para.text}\n\n`;
                }
            });
            return output.trim();
        }
    },

    // Work Experience Commands
    work: {
        description: "Display work experience and projects",
        usage: "work [list|show <project>|search <term>]",
        category: "professional",
        execute: (args) => {
            if (args.length === 0) {
                let output = "=== Work Experience ===\n\n";
                workData.projects.forEach((project, index) => {
                    output += `${index + 1}. ${project.title}\n`;
                    output += `   Tech Stack: ${project.techStack}\n`;
                    if (project.titleLink) {
                        output += `   Link: ${project.titleLink}\n`;
                    }
                    output += "\n";
                });
                output += "Use 'work show <number>' to view project details\n";
                output += "Use 'work search <term>' to search projects";
                return output;
            }

            const [action, ...params] = args;

            switch (action) {
                case 'list':
                    return workData.projects.map((p, i) => `${i + 1}. ${p.title}`).join('\n');

                case 'show':
                    const projectNum = parseInt(params[0]) - 1;
                    if (projectNum >= 0 && projectNum < workData.projects.length) {
                        const project = workData.projects[projectNum];
                        let output = `=== ${project.title} ===\n\n`;
                        output += `Tech Stack: ${project.techStack}\n`;
                        if (project.titleLink) output += `Link: ${project.titleLink}\n`;
                        output += "\nDescription:\n";
                        project.content.forEach(content => {
                            if (content.type === 'paragraph') {
                                output += `${content.text}`;
                                if (content.links) {
                                    content.links.forEach(link => {
                                        output += ` ${link.text} (${link.url})`;
                                    });
                                }
                                if (content.continuation) output += content.continuation;
                                output += "\n\n";
                            }
                        });
                        return output.trim();
                    } else {
                        return `Project ${params[0]} not found. Use 'work list' to see available projects.`;
                    }

                case 'search':
                    const searchTerm = params.join(' ').toLowerCase();
                    const matches = workData.projects.filter(project =>
                        project.title.toLowerCase().includes(searchTerm) ||
                        project.techStack.toLowerCase().includes(searchTerm) ||
                        project.content.some(content =>
                            content.text && content.text.toLowerCase().includes(searchTerm)
                        )
                    );

                    if (matches.length === 0) {
                        return `No projects found matching "${searchTerm}"`;
                    }

                    let output = `Found ${matches.length} project(s) matching "${searchTerm}":\n\n`;
                    matches.forEach((project, index) => {
                        const originalIndex = workData.projects.indexOf(project) + 1;
                        output += `${originalIndex}. ${project.title}\n`;
                        output += `   Tech Stack: ${project.techStack}\n\n`;
                    });
                    return output.trim();

                default:
                    return "Invalid action. Use: work [list|show <number>|search <term>]";
            }
        }
    },

    // Skills Command
    skills: {
        description: "Display technical skills and expertise",
        usage: "skills  ",
        category: "professional",
        execute: (args) => {
            if (args.length === 0) {
                let output = "=== Technical Skills ===\n\n";
                skillCategories.forEach((category, index) => {
                    output += `${index + 1}. ${category.title}\n`;
                    output += `   ${category.description}\n\n`;
                });

                return output;
            }
        }
    },

    smallprojects: {
        description: "Display small projects and side work",
        usage: "smallprojects [list|show <number>]",
        category: "professional",
        execute: (args) => {
            if (args.length === 0) {
                let output = "=== Small Projects ===\n\n";
                smallProjectsData.projects.forEach((project, index) => {
                    output += `${index + 1}. ${project.title}\n`;
                    if (project.titleLink) {
                        output += `   Link: ${project.titleLink}\n`;
                    }
                    output += "\n";
                });
                output += "Use 'smallprojects show <number>' to view project details";
                return output;
            }

            const [action, projectNum] = args;
            if (action === 'show') {
                const index = parseInt(projectNum) - 1;
                if (index >= 0 && index < smallProjectsData.projects.length) {
                    const project = smallProjectsData.projects[index];
                    let output = `=== ${project.title} ===\n\n`;
                    if (project.titleLink) output += `Link: ${project.titleLink}\n\n`;
                    output += `${project.description}`;
                    return output;
                } else {
                    return `Project ${projectNum} not found.`;
                }
            } else if (action === 'list') {
                return smallProjectsData.projects.map((p, i) => `${i + 1}. ${p.title}`).join('\n');
            }

            return "Invalid action. Use: smallprojects [list|show <number>]";
        }
    },

    pc: {
        description: "Display gaming PC specifications",
        usage: "pc  [--format table|list]",
        category: "gaming",
        execute: (args) => {
            const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'list';

            let output = "=== Gaming PC Specifications ===\n\n";

            if (format === 'table') {
                output += "Component".padEnd(15) + " | Specification\n";
                output += "-".repeat(50) + "\n";
                pcSpecs.forEach(spec => {
                    output += `${spec.component.padEnd(15)} | ${spec.spec}\n`;
                });
            } else {
                pcSpecs.forEach(spec => {
                    output += `${spec.component}: ${spec.spec}\n`;
                });
            }

            return output;
        }
    },

    pcspecs: {
        description: "Display gaming PC specifications",
        usage: "pcspecs [--format table|list]",
        category: "gaming",
        execute: (args) => {
            const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'list';

            let output = "=== Gaming PC Specifications ===\n\n";

            if (format === 'table') {
                output += "Component".padEnd(15) + " | Specification\n";
                output += "-".repeat(50) + "\n";
                pcSpecs.forEach(spec => {
                    output += `${spec.component.padEnd(15)} | ${spec.spec}\n`;
                });
            } else {
                pcSpecs.forEach(spec => {
                    output += `${spec.component}: ${spec.spec}\n`;
                });
            }

            return output;
        }
    },

 
    contact: {
        description: "Send a message via contact form",
        usage: "contact [-i|--interactive] [--info]",
        category: "communication",
        state: {
            mode: null,
            formData: {},
            step: 0,
            steps: ['name', 'contact', 'message', 'confirm'] // Changed steps - contact can be phone OR email
        },
        execute: async (args, context, setContactState) => {
            if (args.includes('--info')) {
                return "Contact Information:\nEmail: manishgupta220402@gmail.com\nLinkedIn: linkedin.com/in/manish-gupta-8861ba224\nGitHub: github.com/ManishGupta-x\n\nUse 'contact -i' to send a message";
            }

            if (args.includes('--interactive') || args.includes('-i')) {
                if (setContactState) {
                    setContactState({
                        mode: 'interactive',
                        formData: {},
                        step: 0
                    });
                }
                return "Starting interactive contact form...\nPlease enter your name:\n\n💡 Tip: Type 'exit', 'quit', 'cancel', or 'q' anytime to abort the form";
            }

            return "Contact Options:\n  -i, --interactive  Start interactive contact form\n  --info            Show contact information";
        },

        handleContactInput: async (input, contactState, setContactState) => {
            // Safety check - ensure contactState exists and has required properties
            if (!contactState || typeof contactState.step === 'undefined') {
                console.error('Contact state is not properly initialized');
                return "Error: Contact form not properly initialized. Please restart with 'contact -i'";
            }

            const { formData = {}, step = 0, steps = ['name', 'contact', 'message', 'confirm'] } = contactState;
            const currentField = steps[step];

            // Check for exit commands
            const exitCommands = ['exit', 'quit', 'cancel', 'abort', 'q'];
            if (exitCommands.includes(input.toLowerCase().trim())) {
                if (setContactState) {
                    setContactState({ mode: null, formData: {}, step: 0 });
                }
                return "❌ Contact form cancelled. You can restart anytime with 'contact -i'";
            }

            // Validation functions
            const validate = (field, value) => {
                const trimmedValue = value.trim();

                switch (field) {
                    case 'name':
                        return trimmedValue.length >= 2 ? null : "Name must be at least 2 characters";
                    case 'contact':
                        // Check if it's email or phone
                        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
                        const isPhone = /^\+?[\d\s\-\(\)]+$/.test(trimmedValue);

                        if (!isEmail && !isPhone) {
                            return "Please enter a valid email address or phone number";
                        }
                        return null;
                    case 'message':
                        return trimmedValue.length >= 10 ? null : "Message must be at least 10 characters";
                    default:
                        return null;
                }
            };

            // Handle confirmation step
            if (currentField === 'confirm') {
                const response = input.toLowerCase().trim();
                if (response === 'y' || response === 'yes') {
                    // Submit form
                    try {
                        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBpEMCwMH6JV1h76KDqfYW9Fef6yTms1F8-s4KiA2IVFrb22BtgnxVcw7qTUd3MhsjSA/exec';

                        // Check if contact is phone or email (FIXED REGEX)
                        const contactType = formData.contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact) ? 'email' : 'phone';

                        // Prepare form data for submission
                        const submissionData = {
                            name: formData.name,
                            message: formData.message,
                            timestamp: new Date().toISOString()
                        };

                        // Add contact info to appropriate field
                        if (contactType === 'email') {
                            submissionData.email = formData.contact;
                        } else {
                            submissionData.phone = formData.contact;
                        }

                        await fetch(GOOGLE_SCRIPT_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(submissionData)
                        });

                        // Reset contact state
                        if (setContactState) {
                            setContactState({ mode: null, formData: {}, step: 0 });
                        }
                        return "✅ Message sent successfully! Thank you for reaching out.";
                    } catch (error) {
                        console.error('Error sending message:', error);
                        return "❌ Error sending message. Please try again later.";
                    }
                } else {
                    // Cancel form
                    if (setContactState) {
                        setContactState({ mode: null, formData: {}, step: 0 });
                    }
                    return "Contact form cancelled.";
                }
            }

            // Validate current input
            const error = validate(currentField, input);
            if (error) {
                return `❌ ${error}\nPlease try again:\n\n💡 Tip: Type 'exit' to cancel the form`;
            }

            // Store valid input
            const newFormData = { ...formData, [currentField]: input.trim() };
            const nextStep = step + 1;

            // Check if we're at the confirmation step
            if (nextStep >= steps.length - 1) {
                // Show confirmation
                if (setContactState) {
                    setContactState({
                        mode: 'interactive',
                        formData: newFormData,
                        step: nextStep
                    });
                }

                let summary = "\n=== Contact Form Summary ===\n";
                summary += `Name: ${newFormData.name}\n`;
                summary += `Contact: ${newFormData.contact}\n`;
                summary += `Message: ${newFormData.message}\n\n`;
                summary += "Send this message? (y/n):\n";
                summary += "💡 Tip: Type 'exit' to cancel";
                return summary;
            } else {
                // Move to next field
                if (setContactState) {
                    setContactState({
                        mode: 'interactive',
                        formData: newFormData,
                        step: nextStep
                    });
                }

                const nextField = steps[nextStep];
                const prompts = {
                    contact: "Please enter your email address or phone number:\n💡 Tip: Type 'exit' to cancel",
                    message: "Please enter your message (minimum 10 characters):\n💡 Tip: Type 'exit' to cancel"
                };

                return `✅ ${currentField} saved.\n${prompts[nextField]}`;
            }
        }
    },
    // Social Media Commands
    social: {
        description: "Display social media links",
        usage: "social [platform]",
        category: "communication",
        execute: (args) => {
            const socials = {
                github: "https://github.com/ManishGupta-x",
                linkedin: "https://www.linkedin.com/in/manish-gupta-8861ba224/",
                instagram: "https://www.instagram.com/thecodingfreak_22/",
                email: "manishgupta220402@gmail.com",
                discord: "https://discord.com/users/550267183503114250",
            };

            if (args.length === 0) {
                let output = "=== Social Media Links ===\n\n";
                Object.entries(socials).forEach(([platform, link]) => {
                    output += `${platform}: ${link}\n`;
                });
                return output;
            }

            const platform = args[0].toLowerCase();
            if (socials[platform]) {
                return `${platform}: ${socials[platform]}`;
            } else {
                return `Platform ${platform} not found. Available: ${Object.keys(socials).join(', ')}`;
            }
        }
    },

    // Resume Command
    resume: {
        description: "Display resume information or download link",
        usage: "resume [open]",
        category: "professional",
        execute: (args) => {
            if (args.includes('open')) {
                // Return special command to open resume
                return "OPEN_RESUME:https://drive.google.com/file/d/1LCIeO9p8W49yqbNcLmb-CreENAlBRFMw/view?usp=sharing";

            } else {
                return "Resume Options:\n   open      = Open resume PDF";
            }
        }
    },

 
    // Exit Command
    exit: {
        description: "Close terminal",
        usage: "exit",
        category: "navigation",
        execute: () => "EXIT_TERMINAL"
    }
};

// Command processor function
export const processCommand = async (input, context, contactState, setContactState, pathname, navigate) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return "";

    // Handle contact form input
    if (contactState && contactState.mode === 'interactive') {
        return await terminalCommands.contact.handleContactInput(trimmedInput, contactState, setContactState);
    }

    const [command, ...args] = trimmedInput.split(' ');
    const cmd = command.toLowerCase();

    if (terminalCommands[cmd]) {
        try {
            return await terminalCommands[cmd].execute(args, context, setContactState, pathname, navigate);
        } catch (error) {
            return `Error executing ${cmd}: ${error.message}`;
        }
    } else {
        return `Command not found: ${cmd}. Type "help" for available commands.`;
    }
};

// Get terminal prompt with hardcoded domain
export const getTerminalPrompt = (pathname) => {
    return `@dev.manishguptaji.co.in:${pathname}$ `;
};