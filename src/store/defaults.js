// export const serverHost = 'https://sleepy-scrubland-24958.herokuapp.com';
export const serverHost = 'http://127.0.0.1:8000';

const languageMap = [
  {value: "", label: "Any"}, 
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
  {value: "dentist", label: "Dentist"}
]


export const defaults = {
  languageMap: languageMap,
  resourceTypeMap: resourceTypeMap
}