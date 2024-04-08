type Category = {
  id: number
  name: string
  categoryType: "PRIVATE" | "BUSINESS"
}
type DocumentUser = {
  id: number
  createdAt: Date
  draft: boolean
  paymentStatus: boolean
  template: Template
}

type Template = {
  id: number
  templateName: string
  templateDescription: string
  cost: number
  content: string
  subcategory: Category | null
  questions: Question[]
}
type Question = {
  id: number
  questionText: string
  description: string
  descriptionDetails: string
  texte: string
  valueType: "number" | "input" | "textarea" | "checkbox"
}
type Choice = {
  id: number
  choice: string
  newRelatedText: string
}
type RegisterData = {
  firstname: string
  lastname: string
  email: string
  password: string
  username: string
  role: "ADMIN"
}
type LoginData = {
  email: string
  password: string
}

type User = {
  userId: number
  firstname: string | null
  username: string | null
  lastname: string | null
  phonenumber: string | null
  description: string | null
  adress: string | null
  email: string
  country: string | null
  zipcode: number
  town: string | null
  picture: string | null
  role: "SUSER" | "ADMIN"
}

type questionAnswersType = {
  label: string
  value: string
}
type Answer = {
  questionId: number
  value: string | null
}

// type AddUpdateDocumentQuestion = {
//   documentId: number
//   questionId: number
// } & ({ selectedChoiceId: number } | { value: string })
type AddUpdateDocumentQuestion = {
  isDraft: boolean
  documentId: number
  values: {
    questionId: number
    value: string | number
  }[]
}
type chargePaymentData = {
  paymentId: string
  templateId: number
  documentId: number
}

type DocumentQuestionsValues = {
  documentQuestionValueId: number
  question: Question
  value: string | number
}
