import { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";

export default function TerminalForm() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;


  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step === 0) {
        setName(input);
        setInput("");
        setStep(1);
        setError("");
      } else if (step === 1) {
        if (!isValidEmail(input)) {
          setError("Invalid email format. Please try again.");
          return;
        }
        setEmail(input);
        setInput("");
        setStep(2);
        setError("");
      } else if (step === 2) {
        setMessage(input);
        setInput("");
        setStep(3);
      } else if (step === 3 && input.toLowerCase() === "send") {
        const templateParams = {
          name: name,
          email: email,
          message: message,
        };

        emailjs
          .send(serviceId!, templateId!, templateParams, publicKey!)
          .then(() => {
            console.log("Email sent successfully");
            setInput("");
            setStep(4);
          })
          .catch((error: any) => {
            console.error("Failed to send email:", error);
            setError("Failed to send message. Please try again.");
          });
      } else if (step === 4 && input.toLowerCase() === "clear") {
        setName("");
        setEmail("");
        setMessage("");
        setInput("");
        setStep(0);
        setError("");
      }
    }
  };

  useEffect(() => {
    if (step > 0 && terminalRef.current) {
      terminalRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  return (
    <div style={styles.container}>
      <div style={styles.terminal}>
        <div style={styles.header}>
          <div style={styles.buttons}>
            <div style={{ ...styles.btn, ...styles.red }}></div>
            <div style={{ ...styles.btn, ...styles.yellow }}></div>
            <div style={{ ...styles.btn, ...styles.green }}></div>
          </div>
          <div style={styles.divider}></div>
        </div>

        <div style={styles.body}>
          {step === 0 && (
            <>
              <p style={styles.text}>Ready To Start Something Big Together?</p>
              <p style={styles.text}>
                Leave a message for us and we will get back to you soon!
              </p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>Enter your full name :-</p>
            </>
          )}

          {step === 1 && (
            <>
              <p style={styles.text}>
                Name Initialized: <span style={styles.white}>{name}</span>
              </p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>Enter Your Email:</p>
            </>
          )}

          {step === 2 && (
            <>
              <p style={styles.text}>
                Name Initialized: <span style={styles.white}>{name}</span>
              </p>
              <p style={styles.text}>
                Email Initialized: <span style={styles.white}>{email}</span>
              </p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>How Can We Help You?</p>
            </>
          )}

          {step === 3 && (
            <>
              <p style={styles.text}>
                Name Initialized: <span style={styles.white}>{name}</span>
              </p>
              <p style={styles.text}>
                Email Initialized: <span style={styles.white}>{email}</span>
              </p>
              <p style={styles.text}>
                Message Initialized: <span style={styles.white}>{message}</span>
              </p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>Type &quot;send&quot; To Run This Query:</p>
            </>
          )}

          {step === 4 && (
            <>
              <p style={styles.text}>
                Woohoo! Message Sent. Thank You!{" "}
                <span style={styles.white}>{name}</span>
              </p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>.</p>
              <p style={styles.text}>Type &quot;clear&quot; To Send Another Message</p>
            </>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.line}>
            <span style={styles.arrow}>&gt;</span>
            <input
              ref={inputRef}
              type="text"
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInput}
              placeholder="Type here..."
            />
          </div>
        </div>

        <div ref={terminalRef}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box" as "border-box", // Explicitly cast to match the expected type
  },
  terminal: {
    backgroundColor: "#000",
    color: "#22c55e",
    fontFamily:
      "Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
    padding: "clamp(1rem, 4vw, 2rem)",
    width: "100%",
    height: "100%",
    fontSize: "clamp(0.875rem, 2.5vw, 1.5rem)",
    lineHeight: "1.6",
    boxSizing: "border-box" as "border-box", // Explicitly cast to match the expected type
    position: "relative" as "relative", // Explicitly cast to match the expected type
    overflow: "auto",
    border: "1px solid #374151",
    borderRadius: "1rem",
    margin: "0",
  },
  header: {
    marginBottom: "clamp(0.75rem, 2vw, 1.5rem)",
  },
  buttons: {
    display: "flex",
    gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
    marginBottom: "clamp(1rem, 3vw, 2rem)",
    marginTop: "clamp(0.5rem, 2vw, 1rem)",
  },
  btn: {
    width: "clamp(0.75rem, 3vw, 1rem)",
    height: "clamp(0.75rem, 3vw, 1rem)",
    borderRadius: "50%",
    flexShrink: 0,
  },
  red: {
    backgroundColor: "#f87171",
  },
  yellow: {
    backgroundColor: "#facc15",
  },
  green: {
    backgroundColor: "#4ade80",
  },
  divider: {
    borderBottom: "1px solid #374151",
  },
  body: {
    paddingBottom: "clamp(1rem, 3vw, 2rem)",
  },
  text: {
    margin: "0 0 clamp(0.5rem, 1.5vw, 0.75rem) 0",
    wordWrap: "break-word" as "break-word", // Explicitly cast to match the expected type
    overflowWrap: "break-word" as "break-word", // Explicitly cast to match the expected type
    hyphens: "auto" as "auto", // Explicitly cast to match the expected type
  },
  line: {
    display: "flex",
    alignItems: "center",
    color: "white",
    marginTop: "clamp(0.75rem, 2vw, 1rem)",
    minHeight: "clamp(2.5rem, 6vw, 3rem)",
    gap: "clamp(0.25rem, 1vw, 0.5rem)",
  },
  arrow: {
    flexShrink: 0,
    fontSize: "clamp(1rem, 3vw, 1.5rem)",
    lineHeight: 1,
  },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "clamp(0.875rem, 2.5vw, 1.5rem)",
    lineHeight: "1.5",
    padding: "clamp(0.5rem, 1.5vw, 0.75rem)",
    minHeight: "clamp(1.5rem, 4vw, 2rem)",
    boxSizing: "border-box" as "border-box", // Explicitly cast to match the expected type
    WebkitAppearance: "none" as "none", // Explicitly cast to match the expected type
    borderRadius: "0.25rem",
    caretColor: "#22c55e",
  },
  error: {
    color: "#ef4444",
    marginTop: "clamp(0.5rem, 1.5vw, 0.75rem)",
    fontSize: "clamp(0.8rem, 2.2vw, 1.5rem)",
    wordWrap: "break-word" as "break-word", // Explicitly cast to match the expected type
  },
  white: {
    color: "white",
  },
};
