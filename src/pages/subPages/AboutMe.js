import { useEffect } from "react";

import * as pageSections from "./aboutMePages/AboutMeExports";

const AboutMe = () => {

    return (
        <div id="AboutMe" className="AboutMeWrapper">
            <pageSections.Introduction />
            <pageSections.WorkExperience />
            <pageSections.EducationMajors />
            <pageSections.Projects />
            <pageSections.RelevantSkills />
        </div>
    )
}

export default AboutMe;