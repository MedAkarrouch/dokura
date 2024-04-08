import styled from "styled-components"
import { useTemplate } from "../../Templates/useTemplate"
import DocumentQuestion from "./DocumentQuestion"
import { useState } from "react"
import {
  HiArrowSmRight as ArrowRightIcon,
  HiArrowSmLeft as ArrowLeftIcon
} from "react-icons/hi"
import DocumentQuestionsOverview from "../../Documents/DocumentQuestionsOverview"
import QuestiontsSlider from "../../../ui/QuestiontsSlider"
import DocumentHeader from "../../Documents/DocumentHeader"

const BtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  button {
    background: none;
    border: none;
    background-color: var(--color-stone-500);
    color: var(--white);
    padding: 1rem 2.5rem;
    border-radius: var(--rounded-3xl);
    font-weight: 400;
    font-size: 1.4rem;
    padding: 1rem 2rem;
    /*  */
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /*  */
    &:hover {
      background-color: var(--color-stone-350);
    }
  }
  & button:last-child {
    margin-left: auto;
  }
`
const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h2 {
    font-size: 3.2rem;
    font-weight: 600;
    margin-bottom: 0;
  }
`
const Container = styled.div`
  padding: 2rem;
  display: grid;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > div:first-child {
    /* margin-bottom: 2rem; */
  }
  & > div:last-child {
    margin-top: 3rem;
  }
`
const DocumentQuestions = ({
  documentQuestionsValues
}: {
  documentQuestionsValues?: DocumentQuestionsValues[]
}) => {
  const { template } = useTemplate()
  const questions = template!.questions
  const [overviewData, setOverviewData] = useState<
    {
      questionText: string
      questionId: number
      value: string | number
      active: boolean
    }[]
  >(() => {
    const questionsValuesExist =
      typeof documentQuestionsValues !== "undefined" &&
      documentQuestionsValues.length > 0

    return questions
      .sort((a, b) => a.id - b.id)
      .map((q, i) => {
        return {
          questionText: q.questionText,
          questionId: q.id,
          value: questionsValuesExist
            ? documentQuestionsValues.find((item) => item.question.id === q.id)
                ?.value || ""
            : "",
          active: questionsValuesExist
            ? i === documentQuestionsValues.length
            : i == 0
          // active: i == 0
        }
      })
  })

  const isDraft = overviewData.some((q) => !q.value)
  const activeQuestion = overviewData.find((q) => q.active)
  const doesActiveQuestionHaveValue =
    activeQuestion?.value.toString().trim() !== ""
  console.log("activeQuestion = ", activeQuestion)
  return (
    <>
      <DocumentHeader isDraft={isDraft} overviewData={overviewData} />
      <Container>
        <QuestiontsSlider
          activeQuestion={overviewData.findIndex((q) => q === activeQuestion)}
          length={questions.length}
        />
        <Content>
          {activeQuestion ? (
            questions.map(
              (question, index) =>
                overviewData.at(index)?.active && (
                  <DocumentQuestion
                    key={question.id}
                    question={question}
                    value={overviewData.at(index)?.value || ""}
                    setValue={(value: string) =>
                      setOverviewData((current) =>
                        current.map((q, i) =>
                          i === index ? { ...q, value } : q
                        )
                      )
                    }
                  >
                    <BtnsContainer>
                      {!overviewData.at(0)?.active && (
                        <button
                          onClick={() => {
                            setOverviewData((data) =>
                              data.map((item, i) => {
                                if (i === index - 1)
                                  return { ...item, active: true }
                                else return { ...item, active: false }
                              })
                            )
                          }}
                        >
                          <ArrowLeftIcon />
                          <span>Back</span>
                        </button>
                      )}
                      <button
                        disabled={!doesActiveQuestionHaveValue}
                        onClick={() => {
                          setOverviewData((data) =>
                            data.map((item, i) => {
                              if (i === index + 1)
                                return { ...item, active: true }
                              else return { ...item, active: false }
                            })
                          )
                        }}
                      >
                        <span>Next</span>
                        <ArrowRightIcon />
                      </button>
                    </BtnsContainer>
                  </DocumentQuestion>
                )
            )
          ) : (
            <DocumentQuestionsOverview
              isDraft={isDraft}
              data={overviewData}
              onClick={(index: number) => {
                setOverviewData((data) =>
                  data.map((q, i) =>
                    i === index
                      ? { ...q, active: true }
                      : { ...q, active: false }
                  )
                )
              }}
            />
          )}
        </Content>
      </Container>
    </>
  )
}

export default DocumentQuestions
