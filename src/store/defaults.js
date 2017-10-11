// export const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
export const serverHost = 'http://127.0.0.1:8000';

const languageMap = [ 
  {value: "AR", label: "Arabic"},
  {value: "EN", label: "English"},
  {value: "FR", label: "French"},
  {value: "GK", label: "Greek"},
  {value: "IT", label: "Italian"},
  {value: "RU", label: "Russian"},
  {value: "SP", label: "Spanish"}
]

const resourceTypeMap = [
  {value: "interpreter", label: "Interpreter"},
  {value: "translator", label: "Translator"},
  {value: "dentist", label: "Dentist"},
  {value: "employment_mentor", label: "Employment Mentor"}
]

const professionTypeMap = [
  {value: "accounting", label: "Accounting"},
  {value: "architecture", label: "Architecture"},
  {value: "construction", label: "Construction"},
  {value: "electrical", label: "Electrical Engineering"},
  {value: "finance", label: "Finance"},
  {value: "food_preperation", label: "Food Preperation"},
  {value: "hr", label: "Human Resources"},
  {value: "it", label: "Information Technology"},
  {value: "nursing", label: "Nursing"},
  {value: "nutrition", label: "Nutritional Science"},
  {value: "psych", label: "Psychology / Psychiatry"},
  {value: "software_eng", label: "Software Engineering"},
  {value: "social_work", label: "Social Work"}
]

export const defaults = {
  languageMap: languageMap,
  resourceTypeMap: resourceTypeMap,
  professionTypeMap: professionTypeMap
}