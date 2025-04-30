import { useState } from "react";
import { FaFan } from "react-icons/fa";
import { FSC } from "./components/Fsc";
import { Moodlet, MoodletVariant } from "./components/Moodlet";
import { Dropdown } from "./components/Dropdown";

const dropdownOptions = [
  {
    id: "option1",
    label: "Option 01",
    moodletProps: {
      content: "F",
      variant: "primary" as MoodletVariant,
      letter: true,
    },
  },
  {
    id: "option2",
    label: "Option 02",
    moodletProps: {
      content: "G",
      variant: "secondary" as MoodletVariant,
      letter: true,
    },
  },
  {
    id: "option3",
    label: "Option 03",
    disabled: true,
    moodletProps: {
      content: "H",
      variant: "blue" as MoodletVariant,
      letter: true,
    },
  },
  {
    id: "option4",
    label: "Option 04",
    moodletProps: {
      content: "I",
      variant: "green" as MoodletVariant,
      letter: true,
    },
  },
  {
    id: "option5",
    label: "Option 05",
    moodletProps: {
      content: "J",
      variant: "red" as MoodletVariant,
      letter: true,
    },
  },
  {
    id: "option6",
    label: "Option 06",
    moodletProps: {
      content: "K",
      variant: "yellow" as MoodletVariant,
      letter: true,
    },
  },
];

function App() {
  const [selected, setSelected] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.FscContainer}>
        <div className={classes.title}>FSC</div>
        <FSC />
        <FSC letter />
      </div>
      <div className={classes.moodletContainer}>
        <div className={classes.title}>Moodlet</div>
        <div className={classes.grid}>
          <div className={classes.item}>
            <span>Content options</span>
          </div>
          <div className={classes.itemContentOptions}>
            <span className={classes.contentOption}>
              <span>Letter</span>
              <Moodlet variant="primary" content="Filename test" letter />
            </span>
            <span className={classes.contentOption}>
              <span>Icon</span>
              <Moodlet variant="primary" iconLeft={<FaFan />} />
            </span>
            <span className={classes.contentOption}>
              <span>Ellipsis</span>
              <Moodlet variant="primary" ellipsis />
            </span>
            <span className={classes.contentOption}>
              <span>Word</span>
              <Moodlet variant="primary" content="LOR" />
            </span>
            <span className={classes.contentOption}>
              <span>Icon L</span>
              <Moodlet variant="primary" content="LOR" iconLeft={<FaFan />} />
            </span>
            <span className={classes.contentOption}>
              <span>Icon R</span>
              <Moodlet variant="primary" content="LOR" iconRight={<FaFan />} />
            </span>
          </div>
        </div>

        <div className={classes.grid}>
          <div className={classes.item}>
            <span>Variant</span>
            <span>Read Only</span>
            <span>Interactive / Button</span>
          </div>

          <div className={classes.item}>
            <span>Primary</span>
            <div>
              <Moodlet variant="primary" content="LOR" iconLeft={<FaFan />} />
            </div>
            <div>
              <Moodlet
                variant="primary"
                content="LOR"
                iconLeft={<FaFan />}
                type="interactive"
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Inactive</span>
            <div>
              <Moodlet variant="inactive" content="LOR" iconLeft={<FaFan />} />
            </div>
            <div>
              <Moodlet
                variant="inactive"
                content="LOR"
                iconLeft={<FaFan />}
                type="interactive"
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Secondary</span>
            <div>
              <Moodlet variant="secondary" content="LOR" iconLeft={<FaFan />} />
            </div>
            <div>
              <Moodlet
                variant="secondary"
                content="LOR"
                iconLeft={<FaFan />}
                type="interactive"
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Blue</span>
            <div>
              <Moodlet variant="blue" content="LOR" iconLeft={<FaFan />} />
            </div>
            <div>
              <Moodlet
                variant="blue"
                content="LOR"
                iconLeft={<FaFan />}
                type="interactive"
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Green</span>
            <div>
              <Moodlet variant="green" content="LOR" iconLeft={<FaFan />} />
            </div>
            <div>
              <Moodlet
                variant="green"
                content="LOR"
                iconLeft={<FaFan />}
                type="interactive"
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Red</span>
            <div>
              <Moodlet variant="red" content="LOR" iconLeft={<FaFan />} />
            </div>
            <div>
              <Moodlet
                variant="red"
                content="LOR"
                iconLeft={<FaFan />}
                type="interactive"
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Yellow</span>
            <div>
              <Moodlet variant="yellow" content="LOR" iconLeft={<FaFan />} />
            </div>
            <div>
              <Moodlet
                variant="yellow"
                content="LOR"
                iconLeft={<FaFan />}
                type="interactive"
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Placeholder</span>
            <div>
              <Moodlet
                variant="placeholder"
                content="LOR"
                iconLeft={<FaFan />}
              />
            </div>
          </div>

          <div className={classes.item}>
            <span>Yellow</span>
            <div>
              <Moodlet variant="disabled" content="LOR" iconLeft={<FaFan />} />
            </div>
          </div>
        </div>
      </div>

      <div className={classes.dropdownContainer}>
        <div className={classes.title}>Dropdown</div>
        <Dropdown
          options={dropdownOptions}
          selectedId={selected}
          onSelect={setSelected}
        />
      </div>
    </div>
  );
}

const classes = {
  container: "flex flex-wrap p-5 pb-0",
  FscContainer: "w-3/12 min-w-30 flex flex-col gap-5",
  moodletContainer: "w-5/12 min-w-150",
  dropdownContainer: "w-3/12 min-w-80",
  title: "text-lg font-bold pb-10",
  grid: "grid gap-2 p-10",
  itemContentOptions: "grid grid-cols-6 items-center",
  contentOption: "flex flex-col items-center gap-2",
  item: "grid grid-cols-3 items-center gap-5 p-2 border-y border-gray-300",
};

export default App;
