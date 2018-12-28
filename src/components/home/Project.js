import React from 'react';

import './Project.css';
import Button from '../Button';
import { linkIcon, gitHubIcon } from '../../utils/icons';

const Project = ({
  children,
  imageRef,
  contentRef,
  image,
  gitHubAddress,
  linkAddress,
  customColor,
  projectName
}) => {
  const githubString = `Clicked ${projectName} GitHub Link`;
  const linkString = `Clicked ${projectName} Site Link`;

  return (
    <div className="project">
      <div ref={imageRef} className="projectImage fade">
        <img src={image} width="100%" alt={linkAddress} />
      </div>
      <div className="projectContent">
        <div ref={contentRef} className="projectContentInner fadeRight">
          {children}
          <div className="projectButtons">
            <Button
              text="Github"
              icon={gitHubIcon}
              link={gitHubAddress}
              customColor={customColor}
              bClickCategory="Github"
              bClickAction={githubString}
            />
            <Button
              text="Site Link"
              icon={linkIcon}
              link={linkAddress}
              customColor={customColor}
              bClickCategory="Site Link"
              bClickAction={linkString}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Project;