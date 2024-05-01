import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AlertDialogBox() {
  const user = useSelector((state) => state.signup.user);
  console.log(user);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  function handleReject() {
    navigate("/signup");
  }

  return user ? (
    <Alert>
      <AlertTitle className="text-green-300 uppercase">Success</AlertTitle>
      <AlertDescription>
        Congratulation {user.firstName}. Thank you for registration.
      </AlertDescription>
      <Button onClick={handleClick} className="mt-1 w-20 text-lg uppercase">
        Ok
      </Button>
    </Alert>
  ): ( <Alert>
    <AlertTitle className="text-red-600 uppercase">Register Failed!</AlertTitle>
    <AlertDescription>
      Looks like username or email already exists.
    </AlertDescription>
    <Button onClick={handleReject} className="mt-1 w-20 text-lg uppercase">
      Ok
    </Button>
  </Alert>)
}
