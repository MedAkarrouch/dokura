import { useMutation, useQueryClient } from "@tanstack/react-query"
import { register as registerApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { displayErrorMessage } from "../../utils/helpers"

export const useRegister = () => {
  const queryClient = useQueryClient()
  const { isPending: isLoading, mutate: register } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success("Successfully logged in")
    },
    onError: displayErrorMessage
  })
  return { isLoading, register }
}
