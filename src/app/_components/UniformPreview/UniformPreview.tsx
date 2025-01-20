import { UniformValues } from "@/lib/models/team.model";
import './UniformPreview.css';

export default function UniformPreview({ primaryColor, secondaryColor, tertiaryColor, teamName } : UniformValues) {

    tertiaryColor = tertiaryColor == '' ? primaryColor : tertiaryColor;

    return (
        <svg width="275" height="1194" viewBox="0 0 487 1194" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* <!-- Jersey --> */}
            <path className="jersey" d="M210.5 162L16 203.5L43 301L95.5 306L110 362L115.5 428V550.5C200.431 644.489 281.846 637.719 366.5 550.5C360.5 454 366.5 399 389 306L444.5 301L465.5 203.5L272.5 162C267.52 178.32 260.487 183.697 242 188C225.905 184.065 219.357 177.801 210.5 162Z" stroke={primaryColor == "#ffffff" ? "black" : `${primaryColor}`} fill={`${primaryColor}`} strokeWidth="3"/>
            <path className="jersey_line_left" d="M31 200.5L22.5 202.5L48.5 300.5L56 302L31 200.5Z" stroke={secondaryColor == "#ffffff" ? "black" : `${secondaryColor}`} fill={`${secondaryColor}`} strokeWidth="3"/>
            <path className="undershirt_left" d="M2 216.5L18.5 213L41 295.5L18.5 297L2 216.5Z" stroke={tertiaryColor == "#ffffff" ? "black" : `${tertiaryColor}`} fill={`${tertiaryColor}`} strokeWidth="3"/>
            <path className="undershirt_right" d="M484.5 216.5L464.5 211.5L446 295.5L469 298L484.5 216.5Z" stroke={tertiaryColor == "#ffffff" ? "black" : `${tertiaryColor}`} fill={`${tertiaryColor}`} strokeWidth="3"/>
            <path className="jersey_line_right" d="M428 302.5L453.5 201L462 203L436 301L428 302.5Z" stroke={secondaryColor == "#ffffff" ? "black" : `${secondaryColor}`} fill={`${secondaryColor}`} strokeWidth="3"/>

            <text className="jersey_title" x="50%" y="26%" textAnchor="middle" fill={`${secondaryColor}`} fontSize="50">
                { teamName }
            </text>

            {/* <!-- Pant --> */}
            <path className="pant" d="M332 658.574C259.381 653.864 218.048 655.201 143 666.074C144.993 700.339 154.642 718.28 172 759.074L194.5 1062.07H255C279.143 965.606 292.992 911.646 304.5 810.074C328.583 767.818 331.924 731.251 332 658.574Z" stroke={primaryColor == "#ffffff" ? "black" : `${primaryColor}`} fill={`${primaryColor}`} strokeWidth="3"/>
            <path className="pant_line" d="M229 692.574H222V1061.07H231.5L229 692.574Z" stroke={secondaryColor == "#ffffff" ? "black" : `${secondaryColor}`} fill={`${secondaryColor}`} strokeWidth="3"/>

            {/* <!-- Sox --> */}
            <path className="sox" d="M197.5 1184.57L194 1062.07H255L246.5 1184.57C227.364 1193.96 216.636 1195.05 197.5 1184.57Z" stroke={tertiaryColor == "#ffffff" ? "black" : `${tertiaryColor}`} fill={`${tertiaryColor}`} strokeWidth="3"/>

            {/* <!-- Belt --> */}
            <path className="" d="M156 671.074H143.5C144.125 679.603 144.815 684.265 147.5 692.074H159.5L156 671.074Z" stroke={tertiaryColor == "#ffffff" ? "black" : `${tertiaryColor}`} fill={`${tertiaryColor}`} strokeWidth="3"/>
            <path className="" d="M199.5 664.574L169.5 668.074L172 692.074L203 688.574L199.5 664.574Z" stroke={tertiaryColor == "#ffffff" ? "black" : `${tertiaryColor}`} fill={`${tertiaryColor}`} strokeWidth="3"/>
            <path className="" d="M306 662.574L302 684.574H329V662.574H306Z" stroke={tertiaryColor == "#ffffff" ? "black" : `${tertiaryColor}`} fill={`${tertiaryColor}`} strokeWidth="3"/>

            {/* <!-- Cap --> */}
            <path className="cap_hat" d="M192 27.5C186.319 51.1628 185.445 64.403 185.5 88C193.494 95.3661 203.274 98.2102 226 102C256.427 103.902 272.393 103.985 298.5 102C308.737 99.3447 312.867 96.8677 319.5 92C319.095 57.7406 317.169 43.4191 309 31.5C295.564 18.0051 285.533 11.7772 260.5 4.5C258.298 6.30885 256.466 6.944 251.5 7C247.988 7.28969 246.133 6.75604 243 4.5C221.707 7.71668 210.502 12.588 192 27.5Z" stroke={primaryColor == "#ffffff" ? "black" : `${primaryColor}`} fill={`${primaryColor}`} strokeWidth="3"/>
            <path className="cap_penne" d="M185 83.5C169.134 87.2552 160.705 90.2139 146.5 97C142.835 100.541 142.589 102.64 144 106.5C163.932 125.632 214.76 125.855 255 123.5C281.463 121.38 289.302 115.701 298.5 102.5C272.253 104.012 256.607 104.021 227 102.5C209.585 100.307 200.338 97.4058 185 88.5V84.5" stroke={secondaryColor == "#ffffff" ? "black" : `${secondaryColor}`} fill={`${secondaryColor}`} strokeWidth="3"/>
            <path className="cap_button" d="M258.5 3.5V3.50023C258.5 3.50413 258.5 3.52426 258.479 3.56986C258.455 3.62109 258.402 3.70677 258.293 3.81976C258.066 4.05398 257.666 4.33343 257.056 4.60064C255.839 5.1331 254.052 5.5 252 5.5C249.948 5.5 248.161 5.1331 246.944 4.60064C246.334 4.33343 245.934 4.05398 245.707 3.81976C245.598 3.70677 245.545 3.62109 245.521 3.56986C245.5 3.52426 245.5 3.50413 245.5 3.50023L245.5 3.5L245.5 3.49977C245.5 3.49587 245.5 3.47574 245.521 3.43014C245.545 3.37891 245.598 3.29323 245.707 3.18024C245.934 2.94602 246.334 2.66657 246.944 2.39936C248.161 1.8669 249.948 1.5 252 1.5C254.052 1.5 255.839 1.8669 257.056 2.39936C257.666 2.66657 258.066 2.94602 258.293 3.18024C258.402 3.29323 258.455 3.37891 258.479 3.43014C258.5 3.47574 258.5 3.49587 258.5 3.49977V3.5Z" stroke={tertiaryColor == "#ffffff" ? "black" : `${tertiaryColor}`} fill={`${tertiaryColor}`} strokeWidth="3"/>
        </svg>
    );
}