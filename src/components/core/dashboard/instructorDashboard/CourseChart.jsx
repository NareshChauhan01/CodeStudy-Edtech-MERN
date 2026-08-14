import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';

import { FaRupeeSign } from "react-icons/fa";
import { FaChartPie, FaUsers } from 'react-icons/fa';

export function Coursechart({ dashboardData, chartType = 'revenue' }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [activeType, setActiveType] = useState(chartType);

  useEffect(() => {
    if (!dashboardData || dashboardData.length === 0) {
      setIsEmpty(true);
      setIsLoading(false);
      return;
    }

    const prepareChartData = () => {
      setIsLoading(true);

      // Create data for the chart based on chartType
      let data = [];

      if (activeType === 'revenue') {
        data = dashboardData.map((course, index) => ({
          id: index,
          value: course.totalAmountgenerated,
          label: course.course?.courseName || `Course ${index + 1}`,
          color: generateColor(index),
        })).filter(item => item.value > 0);

        // console.log("data -> ", data)
      }
      else {
        data = dashboardData.map((course, index) => ({
          id: index,
          value: course.totalStudentEnrolled,
          label: course.course?.courseName || `Course ${index + 1}`,
          color: generateColor(index),
        })).filter(item => item.value > 0);

        // console.log("data -> ", data)
      }

      if (data.length === 0) {
        setIsEmpty(true);
      }
      else {
        setIsEmpty(false);
      }

      setChartData(data);
      setIsLoading(false);
    };

    prepareChartData();
  }, [dashboardData, activeType]);

  // Generate vibrant colors for chart segments
  const generateColor = (index) => {
    const colors = [
      '#FFD700', // Yellow
      '#FF6B6B', // Red
      '#4ECDC4', // Teal
      '#9D65C9', // Purple
      '#41B883', // Green
      '#FF8A65', // Orange
      '#5DA5DA', // Blue
      '#F7B7A3', // Peach
      '#1E88E5', // Bright Blue
      '#FFC857', // Golden
    ];

    return colors[index % colors.length];
  };

  const handleToggleChartType = (type) => {
    setActiveType(type);
  };

  // Fixed: simplified to avoid undefined errors
  const getArcLabel = (params) => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    if (!total) return '';

    const percent = Math.round((params.value / total) * 100);
    return percent >= 10 ? `${percent}%` : '';
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-6">
        <p className="text-lg flex items-center font-bold text-richblack-5">
          <FaChartPie className="inline-block mr-2 text-yellow-50" />
          <span>Course Analytics</span>
        </p>

        <div className="flex gap-4 text-sm">
          <motion.button
            className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all ${activeType === 'revenue'
              ? 'bg-yellow-50 text-richblack-900 font-medium'
              : 'text-richblack-300 hover:bg-richblack-700'
              }`}
            onClick={() => handleToggleChartType('revenue')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRupeeSign /> Revenue
          </motion.button>

          <motion.button
            className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all ${activeType === 'students'
              ? 'bg-yellow-50 text-richblack-900 font-medium'
              : 'text-richblack-300 hover:bg-richblack-700'
              }`}
            onClick={() => handleToggleChartType('students')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUsers /> Students
          </motion.button>
        </div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-yellow-50 border-richblack-500 rounded-full animate-spin mb-3"></div>
            <p className="text-richblack-300">Loading chart data...</p>
          </div>
        ) : isEmpty ? (
          <motion.div
            className="text-center py-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartPie className="text-3xl text-richblack-400" />
            </div>
            <p className="text-xl font-semibold text-richblack-100 mb-2">No data to display</p>
            <p className="text-richblack-400 max-w-xs mx-auto">
              Add courses or enroll students to see {activeType === 'revenue' ? 'revenue' : 'student'} analytics here.
            </p>
          </motion.div>
        ) : (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center py-2 text-richblack-5">
            {/* Fixed: Simplified PieChart configuration */}
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 40,
                  // outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  startAngle: -90,
                  endAngle: 270,
                  arcLabel: getArcLabel, // Using the simplified function
                  arcLabelMinAngle: 20,
                  // valueFormatter: (value) => activeType === 'revenue' ? `${value}` : `${value}`,
                },
              ]}

              width={300}
              height={300}

              slotProps={{
                legend: {
                  direction: 'horizontal',
                  position: { vertical: 'bottom', horizontal: 'center' },
                  labelStyle: {
                    fontSize: 12,
                    fill: '#E5E7EB',
                  },
                }
              }}
            />
          </div>
        )}
      </div>

      {!isLoading && !isEmpty && (
        <div className="mt-4 px-2">
          <p className="text-sm font-medium text-richblack-200 mb-2">Course Details:</p>

          <div className="max-h-[100px] overflow-y-auto custom-scrollbar pr-2">
            {chartData.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between text-xs mb-1.5 py-1 px-2 rounded-sm hover:bg-richblack-700"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-richblack-100 truncate max-w-[140px]">{item.label}</span>
                </div>

                <span className="font-medium text-yellow-50">
                  {activeType === 'revenue' ? `₹ ${item.value}` : `${item.value} students`}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}