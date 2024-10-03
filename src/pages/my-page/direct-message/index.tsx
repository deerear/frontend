import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DM {
  dmId: string;
  message: string;
  createdAt: string;
}

interface DMsResponse {
  objects: DM[];
  nextKey: string;
  hasNext: 'y' | 'n';
}

const DmList = () => {
  const [dms, setDms] = useState<DM[]>([]);
  const [nextKey, setNextKey] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const accessToken = 'yourAccessToken'; // 실제 액세스 토큰 사용

  const fetchDms = async () => {
    try {
      const response = await axios.get<DMsResponse>('/api/members/dms', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          nextKey,
          size: 10 // 가져올 데이터 개수
        }
      });

      setDms((prevDms) => [...prevDms, ...response.data.objects]);
      setNextKey(response.data.nextKey);
      setHasNext(response.data.hasNext === 'y');
    } catch (error) {
      console.error('Failed to fetch DMs:', error);
    }
  };

  useEffect(() => {
    fetchDms();
  }, []);

  return (
    <div>
      <h1>DM List</h1>
      <ul>
        {dms.map((dm) => (
          <li key={dm.dmId}>
            <p>
              <strong>Message:</strong> {dm.message}
            </p>
            <p>
              <small>Created At: {new Date(dm.createdAt).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
      {hasNext && <button onClick={fetchDms}>Load More</button>}
    </div>
  );
};

export default DmList;
