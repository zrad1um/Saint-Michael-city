"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isWap, setIsWap] = useState(false);
  const [isTv, setIsTv] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsWap(width < 240);
      setIsTv(width >= 1921);
      
      // on big screens menu always opened
      if (width >= 640) {
        setMobileOpen(true);
      } else {
        setMobileOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`flex flex-col sm:flex-row min-h-screen bg-[#c0c0c0] ${isWap ? 'text-[8px]' : ''} ${isTv ? 'max-w-[1600px] mx-auto' : ''}`}>
      {/*burger for mobile*/}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden fixed top-2 left-2 z-50 text-white bg-blue-800 p-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800"
          style={{ 
            boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff'
          }}
        >
          {mobileOpen ? "☭" : "卐"}
        </button>
      )}

      {/*navpan*/}
      <nav 
        className={`bg-gray-300 text-black border-r-2 border-r-gray-800 border-b-2 border-b-gray-800 sm:w-64 sm:min-w-[16rem] w-full sm:sticky fixed top-0 z-40 transition-transform duration-300 h-screen overflow-y-auto ${
          isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'
        } ${isTv ? 'w-80 min-w-[20rem]' : ''}`}
      >
        {/*head*/}
        <div className="bg-gradient-to-b from-black to-orange-500 text-white p-2 border-b-2 border-b-gray-800 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="text-center flex-grow">
              {!isWap && (
                <div className="text-xs font-bold uppercase tracking-wider mb-1 font-mono italic whitespace-nowrap overflow-hidden text-ellipsis">
                  CITY OF<br />SAINT-MICHAEL
                </div>
              )}
              <h1 className="text-sm sm:text-base font-bold leading-tight uppercase font-mono italic break-words">
                {isWap ? (
                  "U.M.S-M."
                ) : (
                  <>CITY COUNCIL OF THE<br />PEOPLE REPRESENTATIVES</>
                )}
              </h1>
              <div className="text-xs mt-2 font-mono italic">
                XXXVII
              </div>
            </div>
          </div>
        </div>

        {/*menu*/}
        <div className="bg-gray-300 p-1">
          <ul className="flex flex-col space-y-1 text-xs font-bold">
            
            {/*honepage*/}
            <li>
              <Link href="/" className="block px-2 py-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 
              border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}>
                HOMEPAGE
              </Link>
            </li>

            {/*about city*/}
            <li>
              <button
                onClick={() => toggleMenu("about")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white
                 border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">ABOUT MUNICIPALITY</span>
                <span>{openMenu === "about" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "about" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/about/history" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>HISTORY</a></li>
                  <li><a href="/about/geography" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>GEOGRAPHY</a></li>
                </ul>
              )}
            </li>

            {/*city government*/}
            <li>
              <button
                onClick={() => toggleMenu("council")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white 
                border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">{isWap ? "GOVERNMENT" : "GOVERNMENT"}</span>
                <span>{openMenu === "council" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "council" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/government/administration" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>ADMINISTRATION</a></li>
                  <li><a href="/government/council" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>{isWap ? "COUNCIL" : "COUNCIL"}</a></li>
                </ul>
              )}
            </li>

            

            {/*emergency services*/}
            <li>
              <button
                onClick={() => toggleMenu("emergency")}
                className="flex items-center justify-between w-full px-2 py-1 bg-orange-800 text-white border border-t-white border-l-white
                 border-b-gray-800 border-r-gray-800 hover:bg-orange-900 transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">EMERGENCY</span>
                <span>{openMenu === "emergency" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "emergency" && (
                <ul className="ml-4 mt-1 space-y-1 bg-red-200 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/emergency/police" className="block px-2 py-1 text-xs bg-orange-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>POLICE</a></li>
                  <li><a href="/emergency/defense" className="block px-2 py-1 text-xs bg-orange-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>DEFENSE</a></li>
                  <li><a href="/emergency/medical" className="block px-2 py-1 text-xs bg-orange-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>MEDICAL</a></li>
                </ul>
              )}
            </li>

            {/*contacts*/}
            <li>
              <button
                onClick={() => toggleMenu("contacts")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white 
                border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">CONTACTS</span>
                <span>{openMenu === "contacts" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "contacts" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/contacts/reception" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>RECEPTION</a></li>
                  <li><a href="/contacts/departments" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>DEPARTAMENTS</a></li>
                  <li><a href="/contacts/hotline" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>HOTLINE</a></li>
                </ul>
              )}
            </li>
          </ul>

          {/*foot*/}
          <div className="p-2 border-t-2 border-t-gray-800 border-l-2 border-l-white bg-gray-300 text-xs text-center mt-2 border-r-2 border-r-gray-800 border-b-2 border-b-white">
            <div className="text-red-800 font-bold mb-2 font-mono italic uppercase break-words">
              STATE OF EMERGENCY: 7778 DAYS UNDER MARTIAL LAW PROVISIONS.
            </div>
            <div className="text-gray-800 font-mono italic uppercase break-words">
              © 1991-1998. City of Santa-Michael, Enkelinlinna United Municipality, Aurinfjall Republic
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow p-4 sm:ml-0 mt-12 sm:mt-0">
        <div className="bg-white border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-4">
            {/*info about council */}
            <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-3">
              <h2 className="text-lg font-bold text-[#000080] font-mono mb-2 border-b border-gray-600 pb-1">
               ABOUT COUNCIL....
              </h2>
              <div className="space-y-2">
                <div className="w-full bg-white border text-black border-gray-400 p-2">
                    <p className="text-md font-mono font-bold italic">The Saint Michael&#39;s City Council of Representatives was formed in 1848. 
                    Since July 1848, there have been 36 convocations, and the 37th, which began its work two years ago, in 1996, is the current convocation of the city council.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-md font-mono italic">The current council secretary is Harold Stephen McCormick, 
                    a Nationalist Liberal Party member. He was elected on October 1, 1996, at the first autumn session of the 37th council as the leader of the dominant faction on the city council.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-md font-mono text-orange-600 italic">National Liberal Party (14): Enver Hadžihasanović, Albert Martino, Saddam Hussein, Adolf Schickelgruber, 
                    Martin Pulisic, Gavrilo Vulović, Emin Aliyev, Kenny Lee, Stan Ford, Henry Allen, Eleanor Johnson, Dumitru Lunescu, Jimmy Raynor, Sarah Kerrigan</p>
                    <p className="text-md font-mono text-blue-800 italic">Social Democratic Party (6): John Smith, Jane Doe, Robert Brown, Michael Johnson, William Davis, Joseph Stalin</p>
                    <p className="text-md font-mono text-red-800 italic">Communist Party (5): Vladimir Lenin, Leon Trotsky, Mao Zedong, Ho Chi Minh, Fidel Castro</p>
                    <p className="text-md font-mono text-green-800 italic">Green Party (3): Greta Thunberg, Wangari Maathai, John Muir</p>
                    <p className="text-md font-mono text-yellow-800 italic">Libertarian Party (2): Ron Paul, Ayn Rand</p>
                    <p className="text-md font-mono text-purple-800 italic">Progressive Party (2): Elizabeth Warren, Bernie Sanders</p>
                    <p className="text-md font-mono text-pink-800 italic">Independent (1): Alexei Navalny</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}