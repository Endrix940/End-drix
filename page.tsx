
'use client';
import { useState } from "react";

export default function DexIndo() {
  const [pairAddress, setPairAddress] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/bsc/${pairAddress}`);
      const json = await res.json();
      const usdPrice = parseFloat(json.pair.priceUsd);
      const idrPrice = usdPrice * 16300;
      const result = {
        name: json.pair.baseToken.name,
        symbol: json.pair.baseToken.symbol,
        priceUsd: usdPrice,
        priceIdr: idrPrice,
        liquidityUsd: json.pair.liquidity.usd,
        volume24h: json.pair.volume.h24,
        marketCap: json.pair.fdv,
        lpLocked: json.pair.liquidity.locked,
        chartUrl: json.pair.url,
      };
      setData(result);
    } catch (err) {
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Dexscreener Indo 🇮🇩</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Tempel Pair Address (contoh: 0x...)"
          value={pairAddress}
          onChange={(e) => setPairAddress(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={fetchData} disabled={loading} style={{ padding: '8px 16px' }}>
          Cek
        </button>
      </div>
      {loading && <p>Loading data...</p>}
      {data && (
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
          <p><strong>Nama Token:</strong> {data.name} ({data.symbol})</p>
          <p><strong>Harga (USD):</strong> ${data.priceUsd.toFixed(10)}</p>
          <p><strong>Harga (Rp):</strong> Rp{data.priceIdr.toFixed(6)}</p>
          <p><strong>Market Cap:</strong> ${Number(data.marketCap).toLocaleString()}</p>
          <p><strong>Volume 24 Jam:</strong> ${Number(data.volume24h).toLocaleString()}</p>
          <p><strong>Likuiditas:</strong> ${Number(data.liquidityUsd).toLocaleString()}</p>
          <p><strong>LP Locked:</strong> {data.lpLocked ? "✅ Terkunci" : "❌ Tidak Terkunci"}</p>
          <a href={data.chartUrl} target="_blank" style={{ color: 'blue' }}>Lihat Chart</a>
        </div>
      )}
    </div>
  );
}
