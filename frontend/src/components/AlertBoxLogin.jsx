import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AlertBoxLogin() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  return (
    <Alert>
      <AlertTitle className="text-red-600 uppercase">
        Login Failed!
      </AlertTitle>
      <AlertDescription>
        Please enter username and password correctly
      </AlertDescription>
      <Button onClick={handleClick} className="mt-1 w-20 text-lg uppercase">
        Ok
      </Button>
    </Alert>
  );
}
