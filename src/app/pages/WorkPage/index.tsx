import * as React from 'react';
import style from './style.css';
import { Container, Header, Icon } from 'semantic-ui-react';
import {  useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useNavigate } from 'react-router';
import { Models } from 'app/models';
import { ProgressiveImage, Loader } from 'app/components';
import { cloudinaryUrl, cloudinarySizes } from 'app/constants';



export const WorkPage: React.FC = () => {
	const navigate = useNavigate();
  const workState = useSelector((state: RootState) => state.work);

	const redirect = (work: Models.Work, index: number) => {
		navigate('/work/' + work.id);
	};

  if (workState.isLoading) {
    return <Loader />;
  }
  
  return (
    <Container id={style.work} fluid>
      <>
        <Header className={style.header}>WORK</Header>
        <span className={style.description}>A selection of my web development projects</span>
        <span className={style.screenshots}>
          {workState.works.map((work, index) => (
            <span key={work.id} onClick={() => redirect(work, index)}>
              <div className={style['project-image']}>
                <ProgressiveImage 
                  sizes='(max-width: 800px) 100vw, 800px'
                  preview={`${cloudinaryUrl}${cloudinarySizes.tiny}${work.url}`}
                  image={`${cloudinaryUrl}${cloudinarySizes.sharp_img}${work.url}`}
                  srcSet={`${cloudinaryUrl}${cloudinarySizes.sm}${work.url} 200w,
                    ${cloudinaryUrl}${cloudinarySizes.md}${work.url} 400w,
                    ${cloudinaryUrl}${cloudinarySizes.lg}${work.url} 800w,
                    ${cloudinaryUrl}${cloudinarySizes.xl}${work.url} 1200w,
                    ${cloudinaryUrl}${cloudinarySizes.xxl}${work.url} 1400w,
                    ${cloudinaryUrl}${cloudinarySizes.xxxl}${work.url} 1600w,
                  `}
                />
              </div>
              <div className={style.info}>
                <span><p>{work.name}</p></span>
              </div>
            </span>
          ))}				
          <div className={style.more} onClick={() => navigate('/contact')}>
            <span>
              Contact Me for more of my projects
              <Icon name='arrow circle right' />
            </span>
          </div>
        </span>
      </>
    </Container>
  );
};