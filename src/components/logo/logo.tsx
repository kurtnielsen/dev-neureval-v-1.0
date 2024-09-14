'use client';

import type { BoxProps } from '@mui/material/Box';

import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { width, href = '/', height, isSingle = true, disableLink = false, className, sx, ...other },
    ref
  ) => {
    const theme = useTheme();

    const gradientId = useId();

    const TEXT_PRIMARY = theme.vars.palette.text.primary;
    const PRIMARY_LIGHT = theme.vars.palette.primary.light;
    const PRIMARY_MAIN = theme.vars.palette.primary.main;
    const PRIMARY_DARKER = theme.vars.palette.primary.dark;

    /*
    * OR using local (public folder)
    *
    // const singleLogo = (
    //   <Box
    //     alt="Single logo"
    //     component="img"
    //     src={`${CONFIG.assetsDir}/logo/logo-single.svg`}
    //     width="100%"
    //     height="100%"
    //   />
    // );

    // const fullLogo = (
    //   <Box
    //     alt="Full logo"
    //     component="img"
    //     src={`${CONFIG.assetsDir}/logo/logo-full.svg`}
    //     width="100%"
    //     height="100%"
    //   />
    // );
    *
    */

    const singleLogo = (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          className="st0"
          points="87.5,46.4 160.4,221.3 184,131.4 221.3,131.4 221.3,46.4"
          style={{ fill: '#9D9950' }}
        />
        <rect
          x="36"
          y="46.4"
          className="st1"
          width="32.6"
          height="153.6"
          style={{ fill: '#5A859E' }}
        />
        <polygon
          className="st1"
          points="79,209.9 36,209.9 36,225.3 150.8,225.3 79,52.8"
          style={{ fill: '#5A859E' }}
        />
        <polygon
          className="st0"
          points="170.1,225.3 221.3,225.3 221.3,141.4 192,141.4"
          style={{ fill: '#9D9950' }}
        />
        <polygon
          className="st0"
          points="170.1,225.3 162.6,253.5 150.8,225.3"
          style={{ fill: '#9D9950' }}
        />
        <g>
          <path className="st2" d="M162.6,253.5" style={{ fill: '#ACA6A9' }} />
          <polygon
            className="st1"
            points="68.6,46.4 68.6,1.2 87.5,46.4"
            style={{ fill: '#5A859E' }}
          />
        </g>
      </svg>
    );

    const fullLogo = (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g id="Layer_1_00000092451818547423244860000017994119527138092715_">
            <polygon
              className="st0"
              points="43.4,81.9 11.4,38.7 11.4,81.9 7.9,81.9 7.9,33.7 7.9,28.4 43.3,76.6 43.3,42.9 46.7,42.9 46.7,81.9"
              style={{ fill: '#5A859E' }}
            />
            <path
              className="st0"
              d="M54.4,81.9V43.1h33.5v3.6H58v31.7h29.9V82L54.4,81.9L54.4,81.9z M63.2,60.4h23.3v3.4H63.2V60.4z"
              style={{ fill: '#5A859E' }}
            />
            <g>
              <defs>
                <rect id="SVGID_1_" x="-1" y="15" width="361.9" height="96" />
              </defs>
              <clipPath id="SVGID_00000132775123508451159860000012810287720974210979_">
                <use xlinkHref="#SVGID_1_" style={{ overflow: 'visible' }} />
              </clipPath>
              <g
                style={{
                  clipPath: 'url(#SVGID_00000132775123508451159860000012810287720974210979_)',
                }}
              >
                <g>
                  <path
                    className="st0"
                    d="M132.2,43h3.5v21.7c0,12-5.7,17.7-20.2,17.7s-20.2-5.7-20.2-17.7V43H99v21.7c0,9.7,4.5,14.1,16.6,14.1
                    s16.6-4.4,16.6-14.1V43C132.2,43,132.2,43,132.2,43z"
                    style={{ fill: '#5A859E' }}
                  />
                  <path
                    className="st0"
                    d="M181.9,81.9L171,70.4c-0.5,0-0.9,0-1.1,0h-18.2v-3.3h18.2c6.8,0,10-3.6,10-10.4s-3.5-10-9.7-10h-23.7v35.2
                    h-3.6V43.1h27.3c8.4,0,13.3,5.2,13.3,13.7s-3,11.3-8.4,13l12,12.2L181.9,81.9L181.9,81.9L181.9,81.9z"
                    style={{ fill: '#5A859E' }}
                  />
                  <path
                    className="st2"
                    d="M191.7,81.9V43.1h33.5v3.6h-29.9v31.7h29.9V82L191.7,81.9L191.7,81.9z M200.4,60.4h23.3v3.4h-23.3V60.4z"
                    style={{ fill: '#9D9950' }}
                  />
                  <polygon
                    className="st2"
                    points="252.4,84.9 227.7,43 232.1,43 254.4,81.1 276.6,43 280.8,43 256,84.9 254.2,87.8"
                    style={{ fill: '#9D9950' }}
                  />
                  <path
                    className="st2"
                    d="M315.1,81.9l-6.6-11.1h-22.4l1.8-3.1h18.8l-12.1-20.2l-20.5,34.4H270l23-38.2c0.4-0.7,1-1.2,1.8-1.2
                    s1.3,0.4,1.8,1.2l22.9,38.2L315.1,81.9L315.1,81.9L315.1,81.9z"
                    style={{ fill: '#9D9950' }}
                  />
                  <polygon
                    className="st2"
                    points="324.7,81.9 324.7,43 328.3,43 328.3,78.3 356.4,78.3 356.4,81.9"
                    style={{ fill: '#9D9950' }}
                  />
                  <polygon
                    className="st2"
                    points="280.8,43 286.9,43 285.2,46.1 278.9,46.1 278.9,43"
                    style={{ fill: '#9D9950' }}
                  />
                  <polygon
                    className="st0"
                    points="7.4,81.9 1.3,81.9 3,78.8 9.3,78.8 9.3,81.9"
                    style={{ fill: '#5A859E' }}
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );

    const baseSize = {
      width: width ?? 40,
      height: height ?? 40,
      ...(!isSingle && {
        width: width ?? 102,
        height: height ?? 36,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);
