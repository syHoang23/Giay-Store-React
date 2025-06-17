// components/ShippingAddress.jsx
import { useState, useEffect } from "react";

export default function ShippingAddress({ onChange }) {
  const [province, setProvince] = useState('');
  const [provinceCode, setProvinceCode] = useState('');
  const [district, setDistrict] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(setProvinces);
  }, []);

  useEffect(() => {
    if (provinceCode) {
      fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then(res => res.json())
        .then(data => setDistricts(data.districts));
    }
  }, [provinceCode]);

  useEffect(() => {
    onChange({ province, district, addressDetail });
  }, [province, district, addressDetail, onChange]);

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">Tỉnh / Thành phố</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        value={province}
        onChange={(e) => {
          const selected = provinces.find(p => p.name === e.target.value);
          setProvince(e.target.value);
          setProvinceCode(selected?.code);
        }}
      >
        <option value="">-- Chọn tỉnh/thành phố --</option>
        {provinces.map((prov) => (
          <option key={prov.code} value={prov.name}>{prov.name}</option>
        ))}
      </select>

      <label className="block text-gray-700 text-sm font-bold mb-2">Quận / Huyện</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      >
        <option value="">-- Chọn quận/huyện --</option>
        {districts.map((dist) => (
          <option key={dist.code} value={dist.name}>{dist.name}</option>
        ))}
      </select>

      <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ cụ thể</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        value={addressDetail}
        onChange={(e) => setAddressDetail(e.target.value)}
        placeholder="Số nhà, tên đường..."
      />
    </>
  );
}
