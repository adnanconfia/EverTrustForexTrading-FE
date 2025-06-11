import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Button } from "primereact/button";
import Tree from "react-d3-tree";

const orgChartJson = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Workers",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Workers",
            },
          ],
        },
      ],
    },
    {
      name: "Manager",
      attributes: {
        department: "Marketing",
      },
      children: [
        {
          name: "Sales Officer",
          attributes: {
            department: "A",
          },
          children: [
            {
              name: "Salespeople",
            },
          ],
        },
        {
          name: "Sales Officer",
          attributes: {
            department: "B",
          },
          children: [
            {
              name: "Salespeople",
            },
          ],
        },
      ],
    },
  ],
};

// Utility to get initials
const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
};

// Render function for avatar or initials
const renderNodeWithAvatarOrInitials = ({ nodeDatum, toggleNode }) => {
  const hasImage = !!nodeDatum.avatar;
  const initials = getInitials(nodeDatum.name);

  return (
    <g onClick={toggleNode}>
      {hasImage ? (
        <>
          <image
            href={nodeDatum.avatar}
            x={-50}
            y={-50}
            width={100}
            height={100}
            clipPath="url(#avatarClip)"
          />
          <defs>
            <clipPath id="avatarClip">
              <circle cx="0" cy="0" r="50" />
            </clipPath>
          </defs>
        </>
      ) : (
        <>
          <circle r={50} fill="#0891b2" />
          <text
            fill="white"
            stroke="none"
            textAnchor="middle"
            dy="8"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            {initials}
          </text>
        </>
      )}

      <text
        fill="white"
        stroke="none"
        textAnchor="middle"
        dy="-70"
        style={{ fontSize: "14px", fontWeight: "bold" }}
      >
        {nodeDatum.name}
      </text>

      {nodeDatum.attributes?.department && (
        <text
          fill="white"
          stroke="none"
          textAnchor="middle"
          dy="70"
          style={{ fontSize: "12px" }}
        >
          Department: {nodeDatum.attributes.department}
        </text>
      )}
    </g>
  );
};

const Referral = () => {
  const treeContainerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        const { width, height } =
          treeContainerRef.current.getBoundingClientRect();
        setTranslate({ x: width / 2, y: height / 4 });
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    if (treeContainerRef.current) {
      observer.observe(treeContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const columns = [
    { key: "transaction_id", label: "Transaction ID", type: "string" },
    { key: "amount", label: "Amount", type: "amount" },
    { key: "status", label: "Status", type: "status" },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden text-white gap-5">
      <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
        <div className="border-b border-cyan-600 pb-2 mb-3">
          <p className="font-semibold">Referral URL and Tree</p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value="https://yourdomain.com/referral/abc123"
              className="w-full bg-[#001f33] text-white px-4 py-2 rounded-md border border-cyan-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://yourdomain.com/referral/abc123"
                )
              }
              className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-md"
            >
              Copy
            </button>
          </div>

          <p className="text-gray-300 mt-1">
            0 peoples are joined by using this URL
          </p>

          <div
            style={{ width: "100%", height: "500px", position: "relative" }}
            ref={treeContainerRef}
          >
            <Tree
              data={orgChartJson}
              renderCustomNodeElement={renderNodeWithAvatarOrInitials}
              orientation="vertical"
              translate={translate}
              zoomable={false}
              draggable={false}
              zoom={0.7}
              scaleExtent={{ min: 0.3, max: 2 }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white">
        <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
          <p className="font-semibold">All Referral Logs</p>
          <Button
            label="Referral Profit: 0 USDT"
            className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 text-sm  rounded-md"
          />
        </div>
        <div>
          <CustomTable data={[]} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Referral;
