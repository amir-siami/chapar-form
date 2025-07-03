import {StepSkills} from "./components/step-skills.tsx";
import {useFormStore} from "./store/form-store.ts";
import {StepForm} from "./components/step-form.tsx";
import {StepReview} from "./components/step-review.tsx";
import {Stepper} from "./components/ui/stepper.tsx";

function App() {
  const { step } = useFormStore()

  return (
      <main className="p-6">
          <Stepper />
          {step === 1 && <StepForm />}
          {step === 2 && <StepSkills />}
          {step === 3 && <StepReview />}
      </main>
  )
}

export default App
