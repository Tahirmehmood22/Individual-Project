import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const MovingTabs = ({ 
  tabs = [], 
  activeTab, 
  setActiveTab, 
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  contentClassName = "",
  children 
}) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeTabIndex = tabs.findIndex(tab => tab.value === activeTab);
    if (activeTabIndex !== -1 && tabsRef.current[activeTabIndex]) {
      const activeTabElement = tabsRef.current[activeTabIndex];
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };

  const handleMouseEnter = (index) => {
    setHoveredTab(index);
    const tabElement = tabsRef.current[index];
    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
    const activeTabIndex = tabs.findIndex(tab => tab.value === activeTab);
    if (activeTabIndex !== -1 && tabsRef.current[activeTabIndex]) {
      const activeTabElement = tabsRef.current[activeTabIndex];
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="relative flex items-center justify-center p-1 bg-muted/50 rounded-lg mb-6">
        {/* Moving Indicator */}
        <motion.div
          className={cn(
            "absolute top-1 bottom-1 bg-background rounded-md shadow-sm border border-border/50",
            activeTabClassName
          )}
          style={indicatorStyle}
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
        
        {/* Tab Buttons */}
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            ref={(el) => (tabsRef.current[index] = el)}
            className={cn(
              "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md",
              "hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              activeTab === tab.value 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground",
              tabClassName
            )}
            onClick={() => handleTabClick(tab.value)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(contentClassName)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
