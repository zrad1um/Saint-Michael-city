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
        <div className="bg-gradient-to-b from-gray-500 to-orange-500 text-white p-2 border-b-2 border-b-gray-800 sticky top-0 z-10">
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
                  <>CITY PUBLIC<br />HEALTH SERVICE</>
                )}
              </h1>
              <div className="text-xs mt-2 font-mono italic">
                since 1894
              </div>
            </div>
          </div>
        </div>

        {/*menu*/}
        <div className="bg-gray-300 p-1">
          <ul className="flex flex-col space-y-1 text-xs font-bold">
            
            {/*homepage*/}
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
                </ul>
              )}
            </li>
          </ul>

          {/*footer*/}
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
            {/*info about health service */}
            <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-3">
              <h2 className="text-lg font-bold text-[#000080] font-mono mb-2 border-b border-gray-600 pb-1">
               CITY PUBLIC HEALTH SERVICE
              </h2>
              <div className="space-y-2">
                <div className="w-full bg-white border text-black border-gray-400 p-2">
                   <p className="text-sm text-red-900 font-mono font-bold italic uppercase">The city&apos;s public health service is served by three hospitals, the city&apos;s disaster medicine center, 
                    the Aurinfjall State Military Hospital of the National Guard, and twenty-nine district stations. The city&apos;s public health and disaster medicine service was founded in 1894, 
                    the year after the Enkelinlinna County Department of Public Health was established. All public health services, not only in our city but throughout our country, are closely linked to military medicine.</p>
                   <p className="text-sm font-mono font-bold italic">The first hospital, Meadows-Chumash City Hospital, is the largest civilian hospital in the western part of the county. Located in the city center, 
                    it has 4,800 beds.</p>
                   <p className="text-sm font-mono font-bold italic">Second hospital, Colonel Manuel Lopez Hospital, was formerly the Andreaslinna Marine Corps Hospital. It has 3,294 beds.</p>
                   <p className="text-sm font-mono font-bold italic">The third hospital, St. Michael&apos;s Children&apos;s Hospital, has 1,051 beds. The city&apos;s newest hospital, opened in 1991.</p>
                   <p className="text-sm font-mono font-bold italic">The Aurinfjall Military Hospital of the State National Guard has approximately six thousand beds. However, the hospital can also treat civilians 
                    (see the Public Health Act of 1784).</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}