interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
    type: "special";
    requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({ courseName }: { courseName: string }) => (
    <h1>{courseName}</h1>
);

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
      <div>
        {courseParts.map((coursePart) => (
            <Part key={coursePart.name} coursePart={coursePart} />
        ))}
      </div>
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
        case "normal": {
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    <p>{coursePart.description}</p>
                </div>
            );
        }
        case "special": {
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    <p>{coursePart.description}</p>
                    <p>
                        required skills:
                        {coursePart.requirements.map((requirement) => (
                            <p key={requirement}>{requirement}</p>
                        ))}
                    </p>
                </div>
            );
        }
        case "groupProject": {
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    <p>project exercises {coursePart.groupProjectCount}</p>
                </div>
            );
        }
        case "submission": {
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    <p>{coursePart.description}</p>
                    <p>submit to <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a></p>
                </div>
            );
        }
        default: {
            return <div></div>
        }
    }
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <p>
      Number of exercises:
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
);

const App = () => {
  const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the leisured course part",
            type: "normal"
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the harded course part",
            type: "normal"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject"
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
            type: "submission"
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special"
        }
    ]

  return (
      <div>
        <Header courseName={courseName} />
        <Content courseParts={courseParts} />
        <Total courseParts={courseParts} />
      </div>
  );
};

export default App;
