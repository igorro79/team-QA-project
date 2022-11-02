import React, { useState } from 'react';
import { Link } from 'gatsby';
import { BiChevronUp } from 'react-icons/bi';
import * as s from './Accordion.module.css';
import PropTypes from 'prop-types';

function Accordion({
  className = null,
  title,
  content = '',
  titleUrl = null,
  handleClose,
}) {
  const [accordionStatus, setAccordionStatus] = useState(false);
  const handleClick = () => {
    setAccordionStatus(!accordionStatus);
  };

  return (
    <div className={className}>
      <div className={accordionStatus ? s.wrapperUncollapsed : s.wrapper}>
        {titleUrl ? (
          <div className={s.buttonWrapper}>
            <Link
              to={titleUrl}
              onClick={handleClose}
              activeClassName="activeLink"
              className={s.button}
            >
              {title}
            </Link>
            <span
              className={accordionStatus ? s.icon : s.iconRotate}
              onClick={handleClick}
            >
              <BiChevronUp className={s.arrow} />
            </span>
          </div>
        ) : (
          <div className={s.buttonWrapper}>
            <button
              className={s.button}
              aria-label="expand subsection"
              type="button"
              onClick={handleClick}
            >
              {title}
            </button>
            <span
              className={accordionStatus ? s.icon : s.iconRotate}
              onClick={handleClick}
            >
              <BiChevronUp className={s.arrow} />
            </span>
          </div>
        )}
        <ul className={accordionStatus ? s.uncollapsed : s.collapsed}>
          {content.map((i, index) => (
            <li key={index}>
              {i.link_title && (
                <a
                  rel="noreferrer noopener"
                  aria-label={i.link_title}
                  className={s.sublink}
                  onClick={handleClose}
                  target={'_blank'}
                  href={i.url_adress}
                >
                  {i.link_title}
                </a>
              )}
              {i.slug && (
                <Link
                  key={i.slug}
                  className={s.sublink}
                  onClick={handleClose}
                  to={i.slug}
                >
                  {i.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Accordion;
Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.array,
  className: PropTypes.string,
  titleUrl: PropTypes.string,
  handleClose: PropTypes.func,
};
