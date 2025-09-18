"use client";
import { useState, useEffect } from "react";

interface District {
  id: string;
  name: string;
}

interface Club {
  id: string;
  name: string;
  districtId: string;
}

interface ClubInfoSectionProps {
  formData: {
    state: string;
    district: string;
    clubName: string;
    clubId?: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export default function ClubInfoSection({
  formData,
  onChange,
}: ClubInfoSectionProps) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [districtsRes, clubsRes] = await Promise.all([
          fetch("/api/admin/districts"),
          fetch("/api/admin/clubs"),
        ]);

        const districtsData = await districtsRes.json();
        const clubsData = await clubsRes.json();

        setDistricts(districtsData.districts || []);
        setClubs(clubsData.clubs || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = clubs.filter(
        (club) => club.districtId === selectedDistrictId,
      );
      setFilteredClubs(filtered);

      // Update district name in form data
      const selectedDistrict = districts.find(
        (d) => d.id === selectedDistrictId,
      );
      if (selectedDistrict) {
        onChange({
          target: { name: "district", value: selectedDistrict.name },
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    } else {
      setFilteredClubs([]);
    }
  }, [selectedDistrictId, clubs, districts, onChange]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrictId(e.target.value);
  };

  const handleClubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clubId = e.target.value;
    const selectedClub = clubs.find((c) => c.id === clubId);

    if (selectedClub) {
      // Update both clubId and clubName
      onChange({
        target: { name: "clubId", value: clubId },
      } as React.ChangeEvent<HTMLSelectElement>);

      onChange({
        target: { name: "clubName", value: selectedClub.name },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Club Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            District *
          </label>
          <select
            value={selectedDistrictId}
            onChange={handleDistrictChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select Zone</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Club *
          </label>
          <select
            value={formData.clubId || ""}
            onChange={handleClubChange}
            disabled={!selectedDistrictId}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
            required
          >
            <option value="">Select Club</option>
            {filteredClubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
