import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

interface ProfileData{
  userName: string;
  education: string;
  description: string;
  skills: string ;
  pSkill: string;
  wage: string;
  userEmail:string,
  location: string;
  [key: string]: string; // For other potential properties
}

interface LoginData {
  [key: string]: string; // Adjust based on your actual login data structure
}



interface FormData {
  candidateID: string;
  jobID: string;
  applicationStatus: string;
  resume: File | null;
  applicationForm: Array<{
    question: string;
    answer: string;
  }>;
  candidateFeedback: Array<{
    question: string;
    answer: string;
  }>;
}

export const  Account: React.FC = () => {
  const [openApplicants, setOpenApplicants] = useState<boolean>(true)
  const [open, setOpen] = useState<string>("max-sm:hidden ")
  const [label, setLabel] = useState<string>("Close")
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const dispatch = useDispatch()
  const fruits: string[] = ["apple", "banana", "orange"];
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      candidateID: "",
      jobID: "",
      applicationStatus: "active",
      resume: null,
      applicationForm: [{
        question: "",
        answer: ""
      }],
      candidateFeedback: [{
        question: "",
        answer: ""
      }]
    }
  })

  const opener = (): void => {
    if (label === "Close") {
      setOpen("max-sm:hidden")
      setLabel("View")
    } else {
      setOpen("absolute top-[300px] lg:hidden ")
      setLabel("Close")
    }
  }

  setTimeout(() => {
    // Your timeout logic here
  }, 1000)

  const randomNum: number = Math.floor(Math.random() * (200 - 20 + 1) + 20)
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState([]); // Replace 'any' with proper type
  // Replace 'any' with proper type
  const [file, setFile] = useState<File | null>(null)
  const [userName, setUserName] = useState<string>("")
  const [education, setEducation] = useState<string>("")
  const [description, setDesk] = useState<string>("")
  const [skills, setSkills] = useState<string>("")
  const [pSkill, setPSkill] = useState<string>("")
  const [wage, setWage] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const[userEmail,setUserEmail]=useState<string>("")
  const[isEditing,setIsEditing]=useState(false)
  
  let candidateId: string, candidateName: string // You might want to useState these

  const [loginData, setLoginData] = useState<LoginData | null>(null)

  useEffect(() => {
    fetch(`https://solvus-api-4.onrender.com/users/getProfile`)
      .then(res => res.json())
      .then((data: ProfileData) => { 
        setProfile(data)
        setUserName(data.userName)
        setEducation(data.education || "")
        setDesk(data.description || "")
        setWage(data.wage || "")
        setSkills(data.skills || "")
        setLocation(data.location || "")
        setPSkill(data.pSkill || "")
        console.log(data.userName)
      })
      .catch(error => {
        console.error('Error fetching profile:', error)
      })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user: LoginData = JSON.parse(token);
      setLoginData(user)
      console.log(loginData)
    }
    opener()
  }, [])

  useEffect(() => {
    // Your effect logic here
  }, [])

  const closeOverlay = (): void => {
    dispatch({ type: "overlay", payload: "close" })     
    dispatch({ type: "footerOverlay", payload: "close" })
  }

  return (
  <div className="min-h-screen bg-green-50 py-8 px-4 overflow-y-auto h-[600px]">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
       <div className="bg-green-600 px-6 py-4">
          <h1 className="text-sm  text-white">Account Details</h1>
        </div>
        {/* Header */}
        

        <div className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-2xl font-bold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{userName}</h2>
              <p className="text-green-600">{userEmail}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-700">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  
              
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-700 bg-green-50 px-3 py-2 rounded-lg">{userName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
               
                 
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-700 bg-green-50 px-3 py-2 rounded-lg">{userEmail}</p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-700">Education</label>
              {isEditing ? (
                <input
                  type="text"
                  
                  
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-700 bg-green-50 px-3 py-2 rounded-lg">{education}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-700">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  
              
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-700 bg-green-50 px-3 py-2 rounded-lg">{location}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-green-700">Skills</label>
            {isEditing ? (
              <div className="space-y-2">
                {fruits.map((skill, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={skill}
                      
                      className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  
                  className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                >
                  + Add Skill
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {fruits.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-green-700">About Me</label>
            {isEditing ? (
              <textarea
                value={description}
                
                rows={4}
                className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="text-gray-700 bg-green-50 px-4 py-3 rounded-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            {isEditing ? (
              <>
                <button
                  
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    
  )
}