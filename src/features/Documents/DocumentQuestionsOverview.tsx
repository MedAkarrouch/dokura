import styled from "styled-components"
// import { HiOutlinePencilAlt as EditIcon } from "react-icons/hi"
// import { MdEdit as EditIcon } from "react-icons/md"
import { FaEdit as EditIcon } from "react-icons/fa"
import { useAddUpdateDocumentQuestion } from "./useAddUpdateDocumentQuestion"
import { useInitiatePayment } from "../Payment/useInitiatePayment"

const SubHeader = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: var(--color-grey-500);
  font-size: 1.3rem;
`

const Content = styled.div`
  text-align: start;
  box-shadow: var(--shadow);
  /* padding: 2.5rem 2.5rem 0.5rem; */
  padding: 1rem 1.5rem;
  background-color: var(--white);
  border-radius: var(--rounded-lg);
  ul {
    display: flex;
    flex-direction: column;
    & > li:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-200);
    }
    li {
      padding: 1.25rem 0;
      display: grid;
      grid-template-columns: 1fr min-content;
      gap: 0.25rem 2rem;
      align-items: start;
      & p:first-child {
        color: var(--color-stone-500);
        font-size: 1.7rem;
        font-weight: 600;
      }
      & p:last-child {
        color: var(--color-grey-500);
        font-weight: 500;
        font-size: 1.4rem;
        /* font-size: 1.5rem; */
      }
      button {
        /* align-self: start; */
        border: none;
        background: none;
        svg {
          color: var(--color-stone-500);
          width: 1.75rem;
          height: 1.75rem;
        }
      }
    }
  }
`
const BtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  button {
    background: none;
    border: none;
    background-color: var(--color-stone-500);
    color: var(--white);
    padding: 1rem 2.5rem;
    border-radius: var(--rounded-3xl);
    font-weight: 500;
    font-size: 1.4rem;
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
const DocumentQuestionsOverview = ({
  data,
  isDraft,
  onClick
}: {
  data: {
    questionText: string
    questionId: number
    value: string | number
    active: boolean
  }[]
  onClick: (index: number) => void
  isDraft: boolean
}) => {
  const { isLoading: isLoading1, addUpdateDocumentQuestion } =
    useAddUpdateDocumentQuestion()
  const { isLoading: isLoading2, initiatePayment } = useInitiatePayment()
  const isLoading = isLoading1 || isLoading2

  const clickHandler = () => {
    const values = data.map((item) => {
      return { questionId: item.questionId, value: item.value }
    })
    addUpdateDocumentQuestion(
      { values, isDraft },
      {
        onSuccess: () => {
          initiatePayment()
        }
      }
    )

    // Redirect the user to the checkout page
  }

  return (
    <>
      <div>
        <h2>Overview</h2>
        <SubHeader>Look through your answers.</SubHeader>
      </div>
      <Content>
        <ul>
          {data.map((item, i) => (
            <li>
              <p>{item.questionText}</p>
              <button onClick={() => onClick(i)}>
                <EditIcon />
              </button>
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </Content>
      <BtnsContainer>
        <button onClick={clickHandler}>
          {isLoading ? "Loading..." : "Proceed To Checkout"}
        </button>
      </BtnsContainer>
    </>
  )
}

export default DocumentQuestionsOverview
