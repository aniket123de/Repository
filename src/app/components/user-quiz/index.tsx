"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faCode, 
  faArrowRight, 
  faArrowLeft,
  faCheck,
  faCog,
  faMobile,
  faRobot,
  faServer,
  faDesktop,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin as faLinkedinBrand } from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './user-quiz.module.scss';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UserData {
  name: string;
  email: string;
  linkedin: string;
  expertise: 'webdev' | 'appdev' | 'blockchain' | 'aiml' | '';
}

interface Question {
  id: number;
  question: string;
  options: string[];
  type: 'single' | 'multiple';
}

const interestQuestions = {
  webdev: [
    {
      id: 1,
      question: "Which frontend technologies are you most interested in?",
      options: ["React/Next.js", "Vue.js/Nuxt.js", "Angular", "Svelte/SvelteKit", "Vanilla JavaScript", "TypeScript"],
      type: 'multiple' as const
    },
    {
      id: 2,
      question: "What aspects of web development excite you most?",
      options: ["UI/UX Design", "Performance Optimization", "SEO & Accessibility", "Progressive Web Apps", "E-commerce Solutions", "API Integration"],
      type: 'multiple' as const
    },
    {
      id: 3,
      question: "Which backend technologies interest you?",
      options: ["Node.js/Express", "Python/Django", "PHP/Laravel", "Ruby on Rails", "ASP.NET", "Serverless Functions"],
      type: 'multiple' as const
    }
  ],
  appdev: [
    {
      id: 1,
      question: "Which mobile development approaches interest you?",
      options: ["Native iOS (Swift)", "Native Android (Kotlin/Java)", "React Native", "Flutter", "Xamarin", "Ionic"],
      type: 'multiple' as const
    },
    {
      id: 2,
      question: "What type of applications do you enjoy building?",
      options: ["Social Media Apps", "E-commerce Apps", "Gaming Apps", "Productivity Tools", "Health & Fitness", "Educational Apps"],
      type: 'multiple' as const
    },    {
      id: 3,
      question: "Which backend technologies do you prefer for mobile apps?",
      options: ["Node.js/Express", "Python/Django", "Firebase", "AWS Amplify", "Supabase", "Parse Server"],
      type: 'multiple' as const
    },
    {
      id: 4,
      question: "Which app development areas fascinate you?",
      options: ["AR/VR Integration", "Real-time Features", "Offline Capabilities", "Push Notifications", "App Store Optimization", "Cross-platform Development"],
      type: 'multiple' as const
    }
  ],
  blockchain: [
    {
      id: 1,
      question: "Which blockchain platforms interest you most?",
      options: ["Ethereum", "Solana", "Polygon", "Binance Smart Chain", "Cardano", "Avalanche"],
      type: 'multiple' as const
    },
    {
      id: 2,
      question: "What blockchain applications excite you?",
      options: ["DeFi Protocols", "NFT Marketplaces", "DAOs", "Smart Contracts", "Cryptocurrency Wallets", "Supply Chain Solutions"],
      type: 'multiple' as const
    },
    {
      id: 3,
      question: "Which development areas in blockchain appeal to you?",
      options: ["Smart Contract Development", "Web3 Frontend", "Blockchain Security", "Tokenomics", "Layer 2 Solutions", "Cross-chain Protocols"],
      type: 'multiple' as const
    }
  ],
  aiml: [
    {
      id: 1,
      question: "Which AI/ML domains interest you most?",
      options: ["Computer Vision", "Natural Language Processing", "Deep Learning", "Machine Learning", "Reinforcement Learning", "Generative AI"],
      type: 'multiple' as const
    },
    {
      id: 2,
      question: "What AI applications fascinate you?",
      options: ["Chatbots & Virtual Assistants", "Image Recognition", "Predictive Analytics", "Recommendation Systems", "Autonomous Systems", "Content Generation"],
      type: 'multiple' as const
    },
    {
      id: 3,
      question: "Which tools and frameworks do you prefer?",
      options: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI APIs", "Hugging Face", "MLflow"],
      type: 'multiple' as const
    }
  ]
};

const expertiseIcons = {
  webdev: faDesktop,
  appdev: faMobile,
  blockchain: faServer,
  aiml: faRobot
};

const expertiseLabels = {
  webdev: "Web Development",
  appdev: "App Development", 
  blockchain: "Blockchain",
  aiml: "AI/ML"
};

export const UserQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    linkedin: '',
    expertise: ''
  });  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);  const [allAnswers, setAllAnswers] = useState<Record<number, number[]>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExpertiseSelect = (expertise: 'webdev' | 'appdev' | 'blockchain' | 'aiml') => {
    setUserData(prev => ({
      ...prev,
      expertise
    }));
  };
  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      // Reset quiz state when moving to quiz step
      if (currentStep === 1) {
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setAllAnswers({});
        setQuizCompleted(false);
        setShowResults(false);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => {
      if (prev.includes(answerIndex)) {
        return prev.filter(index => index !== answerIndex);
      } else {
        return [...prev, answerIndex];
      }
    });
  };
  const handleQuestionNext = () => {
    if (selectedAnswers.length > 0 && userData.expertise) {
      const questions = interestQuestions[userData.expertise];
      
      // Save current answers
      setAllAnswers(prev => ({
        ...prev,
        [currentQuestion]: selectedAnswers
      }));

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswers([]);
      } else {
        setQuizCompleted(true);
        setShowResults(true);
      }
    }
  };  const handleSubmitProfile = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare the profile data
      const profileData = {
        personalInfo: {
          name: userData.name,
          email: userData.email,
          linkedin: userData.linkedin,
          expertise: userData.expertise
        },
        interests: allAnswers,
        interestDetails: userData.expertise ? Object.entries(allAnswers).map(([questionIndex, answers]) => ({
          question: interestQuestions[userData.expertise as keyof typeof interestQuestions][parseInt(questionIndex)].question,
          selectedOptions: answers.map(answerIndex => 
            interestQuestions[userData.expertise as keyof typeof interestQuestions][parseInt(questionIndex)].options[answerIndex]
          )
        })) : [],
        submittedAt: new Date().toISOString()
      };

      console.log('Profile Data to Submit:', profileData);
      
      // Submit to Supabase via API
      const response = await fetch('/api/submit-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit profile');
      }
      
      setIsSubmitted(true);
      console.log('Profile submitted successfully:', result);
      
    } catch (error) {
      console.error('Error submitting profile:', error);
      // You can add a toast notification or error state here
      alert(`Error submitting profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setUserData({
      name: '',
      email: '',
      linkedin: '',
      expertise: ''
    });
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAllAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  const isStep0Valid = userData.name && userData.email && userData.linkedin;
  const isStep1Valid = userData.expertise;

  const renderPersonalInfo = () => (
    <div className={s["form-container"]}>
      <div className={s["form-header"]}>
        <h3>Tell us about yourself</h3>
        <p>Let&apos;s get to know you better!</p>
      </div>
      
      <div className={s["form-group"]}>
        <label htmlFor="name">
          <FontAwesomeIcon icon={faUser} />
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={userData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className={s["form-group"]}>
        <label htmlFor="email">
          <FontAwesomeIcon icon={faEnvelope} />
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={userData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className={s["form-group"]}>
        <label htmlFor="linkedin">
          <FontAwesomeIcon icon={faLinkedinBrand} />
          LinkedIn Profile
        </label>
        <input
          id="linkedin"
          type="url"
          value={userData.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/your-profile"
          required
        />
      </div>      <button 
        className={s["next-btn"]}
        onClick={handleNextStep}
        disabled={!isStep0Valid}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">NEXT STEP</span>
        <span className="circle" />
        <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </div>
  );

  const renderExpertiseSelection = () => (
    <div className={s["expertise-container"]}>      <div className={s["form-header"]}>
        <h3>What&apos;s your area of expertise?</h3>
        <p>Select the domain you&apos;re most passionate about</p>
      </div>

      <div className={s["expertise-grid"]}>
        {Object.entries(expertiseLabels).map(([key, label]) => (
          <div
            key={key}
            className={`${s["expertise-card"]} ${userData.expertise === key ? s["selected"] : ''}`}
            onClick={() => handleExpertiseSelect(key as keyof typeof expertiseLabels)}
          >
            <div className={s["expertise-icon"]}>
              <FontAwesomeIcon icon={expertiseIcons[key as keyof typeof expertiseIcons]} />
            </div>
            <h4>{label}</h4>
            <div className={s["check-icon"]}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        ))}
      </div>

      <div className={s["navigation-buttons"]}>
        <button 
          className={s["prev-btn"]}
          onClick={handlePrevStep}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Previous
        </button>        <button 
          className={s["next-btn"]}
          onClick={handleNextStep}
          disabled={!isStep1Valid}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
          </svg>
          <span className="text">NEXT</span>
          <span className="circle" />
          <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
          </svg>
        </button>
      </div>
    </div>
  );
  const renderQuiz = () => {
    if (!userData.expertise) return null;
    
    const questions = interestQuestions[userData.expertise];
    const currentQ = questions[currentQuestion];    if (showResults) {
      const totalSelections = Object.values(allAnswers).reduce((sum, answers) => sum + answers.length, 0);
      
      if (isSubmitted) {
        return (
          <div className={s["results-container"]}>
            <div className={s["success-message"]}>
              <div className={s["success-icon"]}>
                <FontAwesomeIcon icon={faCheck} />
              </div>              <h3>Profile Submitted Successfully!</h3>
              <p>Thank you! Your profile has been saved and you&apos;ll now get better developer matches based on your interests.</p>
              
              <div className={s["navigation-buttons"]}>
                <button 
                  className={s["restart-btn"]}
                  onClick={resetQuiz}
                >
                  Create Another Profile
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      return (
        <div className={s["results-container"]}>
          <div className={s["results-header"]}>
            <div className={s["score-circle"]}>
              <div className={s["score-content"]}>
                <span className={s["score-number"]}>{totalSelections}</span>
                <span className={s["score-label"]}>Interests</span>
              </div>
            </div>            <h3>Profile Complete!</h3>
            <p>Great! We&apos;ve captured your interests in {expertiseLabels[userData.expertise]}. This will help us match you with like-minded developers.</p>
          </div>

          <div className={s["user-summary"]}>
            <h4>Your Profile Summary</h4>
            <div className={s["summary-grid"]}>
              <div className={s["summary-item"]}>
                <span className={s["label"]}>Name:</span>
                <span className={s["value"]}>{userData.name}</span>
              </div>
              <div className={s["summary-item"]}>
                <span className={s["label"]}>Email:</span>
                <span className={s["value"]}>{userData.email}</span>
              </div>
              <div className={s["summary-item"]}>
                <span className={s["label"]}>LinkedIn:</span>
                <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className={s["value"]}>
                  View Profile
                </a>
              </div>
              <div className={s["summary-item"]}>
                <span className={s["label"]}>Expertise:</span>
                <span className={s["value"]}>{expertiseLabels[userData.expertise]}</span>
              </div>
            </div>
              <div className={s["interests-summary"]}>
              <h5>Your Selected Interests:</h5>
              {Object.entries(allAnswers).map(([questionIndex, answers]) => (
                <div key={questionIndex} className={s["question-interests"]}>
                  <p className={s["question-title"]}>{questions[parseInt(questionIndex)].question}</p>
                  <div className={s["selected-options"]}>
                    {answers.map(answerIndex => (
                      <span key={answerIndex} className={s["interest-tag"]}>
                        {questions[parseInt(questionIndex)].options[answerIndex]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>          <div className={s["navigation-buttons"]}>
            <button 
              className={s["prev-btn"]}
              onClick={handlePrevStep}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Expertise
            </button>
            <button 
              className={s["submit-btn"]}
              onClick={handleSubmitProfile}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={s["spinner"]}></span>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Profile
                  <FontAwesomeIcon icon={faCheck} />
                </>
              )}
            </button>
            <button 
              className={s["restart-btn"]}
              onClick={resetQuiz}
            >
              Start Over
            </button>
          </div>
        </div>
      );
    }    return (
      <div className={s["quiz-container"]}>
        <div className={s["quiz-header"]}>
          <div className={s["progress-bar"]}>
            <div 
              className={s["progress-fill"]}
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className={s["question-counter"]}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <div className={s["question-container"]}>
          <h3>{currentQ.question}</h3>
          <p className={s["question-subtitle"]}>Select all that apply to your interests</p>
          
          <div className={s["options-container"]}>
            {currentQ.options.map((option: string, index: number) => (
              <button
                key={index}
                className={`${s["option-btn"]} ${selectedAnswers.includes(index) ? s["selected"] : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className={s["option-letter"]}>{String.fromCharCode(65 + index)}</span>
                <span className={s["option-text"]}>{option}</span>
                <div className={s["option-check"]}>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </button>
            ))}
          </div>

          <div className={s["navigation-buttons"]}>
            <button 
              className={s["prev-btn"]}
              onClick={currentQuestion === 0 ? handlePrevStep : () => {
                setCurrentQuestion(prev => prev - 1);
                setSelectedAnswers(allAnswers[currentQuestion - 1] || []);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              {currentQuestion === 0 ? 'Back to Expertise' : 'Previous Question'}
            </button>            <button 
              className={s["next-btn"]}
              onClick={handleQuestionNext}
              disabled={selectedAnswers.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
              <span className="text">{currentQuestion === questions.length - 1 ? 'COMPLETE PROFILE' : 'NEXT'}</span>
              <span className="circle" />
              <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={s["user-quiz"]} ref={sectionRef}>
      <h2 ref={titleRef}>Get to Know You Better</h2>
      
      <div className={s["quiz-content"]} ref={contentRef}>
        <div className={s["step-indicator"]}>
          <div className={`${s["step"]} ${currentStep >= 0 ? s["active"] : ''} ${currentStep > 0 ? s["completed"] : ''}`}>
            <span>1</span>
            Personal Info
          </div>
          <div className={`${s["step"]} ${currentStep >= 1 ? s["active"] : ''} ${currentStep > 1 ? s["completed"] : ''}`}>
            <span>2</span>
            Expertise
          </div>          <div className={`${s["step"]} ${currentStep >= 2 ? s["active"] : ''}`}>
            <span>3</span>
            Interest Assessment
          </div>
        </div>

        <div className={s["step-content"]}>
          {currentStep === 0 && renderPersonalInfo()}
          {currentStep === 1 && renderExpertiseSelection()}
          {currentStep === 2 && renderQuiz()}
        </div>
      </div>
    </div>
  );
};
