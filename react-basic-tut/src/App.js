
import { useState } from 'react';
import Accordion from './Accordion';
import Profile from './Profile';

function App() {
  const [openAccordionId, setOpenAccordionId] = useState(null);

  const handleAccordionClick = (accordionId) => {
    setOpenAccordionId((prevValue) => {
      return prevValue === accordionId ? null : accordionId;
    });
  };

  return (
    <div>
      <Accordion
        id="my-profile"
        labelText="My profile"
        open={openAccordionId === 'my-profile'}
        onClick={handleAccordionClick}
      >
        <Profile />
      </Accordion>
      <Accordion
        id="my-hobbies"
        labelText="My hobbies"
        open={openAccordionId === 'my-hobbies'}
        onClick={handleAccordionClick}>
        New Accordion
      </Accordion>
    </div>
  );
}

export default App;
