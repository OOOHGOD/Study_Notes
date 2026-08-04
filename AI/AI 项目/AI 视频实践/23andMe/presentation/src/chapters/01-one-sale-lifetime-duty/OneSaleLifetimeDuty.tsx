import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./OneSaleLifetimeDuty.css";

const ASSET_ROOT = `${import.meta.env.BASE_URL}assets/official`;
const GENERATED_ROOT = `${import.meta.env.BASE_URL}assets/generated`;

function DnaMark({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={compact ? "os-dna os-dna-compact" : "os-dna"}
      viewBox="0 0 280 520"
      role="img"
      aria-label="DNA double helix"
    >
      <path className="os-dna-strand os-dna-a" d="M62 14 C240 94 240 170 62 250 C-12 286 -12 354 62 506" />
      <path className="os-dna-strand os-dna-b" d="M218 14 C40 94 40 170 218 250 C292 286 292 354 218 506" />
      {[70, 125, 180, 235, 292, 350, 410, 466].map((y, index) => (
        <line
          className="os-dna-rung"
          key={y}
          x1={index % 2 === 0 ? 88 : 70}
          y1={y}
          x2={index % 2 === 0 ? 192 : 210}
          y2={y}
        />
      ))}
    </svg>
  );
}

function RazorModel() {
  return (
    <div className="os-razor-model" aria-hidden="true">
      <div className="os-razor-head">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="os-razor-neck" />
      <div className="os-razor-handle" />
    </div>
  );
}

function Arrow() {
  return (
    <svg className="os-flow-arrow" viewBox="0 0 150 50" aria-hidden="true">
      <path d="M4 25 H132" />
      <path d="M112 8 L134 25 L112 42" />
    </svg>
  );
}

export default function OneSaleLifetimeDuty({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <div className="os-scene os-hook-scene">
        <div className="os-zine-wash" aria-hidden="true">
          <img src={`${GENERATED_ROOT}/one-sale-zine-background-v2.png`} alt="" />
          <i />
        </div>
        <div className="os-hook-copy">
          <p className="os-kicker">一门生意的致命反差</p>
          <div className="os-hook-line os-hook-line-one">
            <span>只赚你</span>
            <strong>一次</strong>
          </div>
          <div className="os-hook-line os-hook-line-life">
            <span>却要守</span>
            <strong>一辈子</strong>
          </div>
          <p className="os-hook-note">DNA · 无法更换的个人数据</p>
        </div>
        <div className="os-hook-visual">
          <div className="os-receipt">
            <span>REVENUE</span>
            <b>1×</b>
            <small>ONE SALE</small>
          </div>
          <div className="os-life-line" />
          <DnaMark />
          <span className="os-infinity">∞</span>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="os-scene os-razor-scene">
        <div className="os-razor-copy">
          <p className="os-kicker">经典的重复收入</p>
          <h2>剃须刀只卖一次</h2>
          <h3>刀片，可以一直卖。</h3>
        </div>
        <RazorModel />
        <Arrow />
        <div className="os-blade-stream" aria-label="持续购买的替换刀片">
          {[1, 2, 3, 4].map((item) => (
            <div className="os-blade" key={item} style={{ "--os-order": item } as CSSProperties}>
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
        <div className="os-repeat-word" aria-label="repeat revenue">
          <span>REPEAT × REPEAT × REPEAT ×</span>
          <span aria-hidden="true">REPEAT × REPEAT × REPEAT ×</span>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="os-scene os-one-sale-scene">
        <div className="os-brand-block">
          <img src={`${ASSET_ROOT}/23andme-logo.png`} alt="23andMe" />
          <span>商业模型 / CUSTOMER 01</span>
        </div>
        <div className="os-one-sale-copy">
          <p>同一个顾客</p>
          <div className="os-purchase-count hero-num">01</div>
          <h2>一辈子，可能只买一次。</h2>
        </div>
        <div className="os-terminal-track" aria-hidden="true">
          <i className="os-track-dot os-track-paid" />
          <i className="os-track-line" />
          <i className="os-track-cut" />
          <span>交易结束</span>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="os-scene os-kit-scene">
        <div className="os-kit-copy">
          <p className="os-kicker">家用基因检测 / 官方流程</p>
          <h2>吐口水。封装。寄回。</h2>
        </div>
        <div className="os-kit-flow">
          <figure>
            <img src={`${ASSET_ROOT}/kit-step-2.png`} alt="向采集管提供唾液样本" />
            <figcaption>提供样本</figcaption>
          </figure>
          <Arrow />
          <figure>
            <img src={`${ASSET_ROOT}/kit-step-5.png`} alt="将采集管封装进生物样本袋" />
            <figcaption>密封样本</figcaption>
          </figure>
          <Arrow />
          <figure>
            <img src={`${ASSET_ROOT}/kit-step-6.png`} alt="将样本寄回实验室" />
            <figcaption>寄回实验室</figcaption>
          </figure>
        </div>
        <p className="os-source">SOURCE · 23andMe Customer Care</p>
      </div>
    );
  }

  if (step >= 4 && step <= 6) {
    const activeResult = step - 4;
    return (
      <div className="os-scene os-results-scene">
        <div className="os-results-center">
          <DnaMark compact />
          <span>YOUR DNA</span>
        </div>
        <div className={`os-result os-result-origin ${activeResult === 0 ? "is-active" : "is-past"}`}>
          <b>祖源</b>
          <small>你来自哪里</small>
        </div>
        {activeResult >= 1 && (
          <div className={`os-result os-result-family ${activeResult === 1 ? "is-active" : "is-past"}`}>
          <b>亲属</b>
          <small>可能的血缘关系</small>
          </div>
        )}
        {activeResult >= 2 && (
          <div className="os-result os-result-health is-active">
            <b>健康风险</b>
            <small>部分遗传提示</small>
          </div>
        )}
        <svg className="os-result-links" viewBox="0 0 1920 1080" aria-hidden="true">
          <path className="is-visible" d="M960 540 C760 450 610 350 420 280" />
          <path className={activeResult >= 1 ? "is-visible" : ""} d="M960 540 C1170 420 1360 350 1510 260" />
          <path className={activeResult >= 2 ? "is-visible" : ""} d="M960 540 C1130 670 1310 760 1490 790" />
        </svg>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className="os-scene os-repeat-test-scene">
        <div className="os-constant-copy">
          <p className="os-kicker">低频产品的根源</p>
          <div className="os-constant-title">
            <span>DNA</span>
            <b>基本不会变</b>
          </div>
        </div>
        <div className="os-test-timeline">
          <div className="os-test os-test-first">
            <span>第一次检测</span>
            <b>完成</b>
          </div>
          <div className="os-test-line" />
          <div className="os-test os-test-second">
            <span>第二次检测</span>
            <b>为什么？</b>
          </div>
        </div>
      </div>
    );
  }

  if (step === 8) {
    return (
      <div className="os-scene os-balance-scene">
        <div className="os-balance-title">
          <p className="os-kicker">交易结束之后</p>
          <h2>收入停止。责任继续。</h2>
        </div>
        <div
          className="os-duty-art"
          role="img"
          aria-label="一枚代表一次付款的红色硬币，被长期保存 DNA 数据的巨大档案柜压低"
        >
          <img src={`${GENERATED_ROOT}/lifetime-duty-pen-illustration-v1.png`} alt="" />
          <i className="os-duty-scan" aria-hidden="true" />
          <div className="os-duty-label os-duty-income">
            <span>01</span>
            <b>一次付款</b>
          </div>
          <div className="os-duty-label os-duty-archive">
            <span>∞</span>
            <b>长期保存</b>
            <small>极度敏感 · 无法更换</small>
          </div>
        </div>
      </div>
    );
  }

  if (step === 9) {
    return (
      <div className="os-scene os-close-scene">
        <div className="os-close-rule rule" />
        <div className="os-close-copy">
          <p>23andMe 的商业模式陷阱</p>
          <h2>
            一次收入
            <span>永久责任</span>
          </h2>
          <div className="os-close-sub">从第一天开始，就埋着一颗雷。</div>
        </div>
        <figure className="os-close-poster" aria-label="ONE SALE 与 LIFETIME DUTY 独立杂志海报">
          <img src={`${GENERATED_ROOT}/one-sale-zine-background-v2.png`} alt="" />
        </figure>
        <svg className="os-crack" viewBox="0 0 620 920" aria-hidden="true">
          <path d="M318 0 L286 190 L348 286 L252 416 L330 548 L220 668 L286 920" />
          <path d="M302 262 L176 336 L112 462" />
          <path d="M304 552 L438 636 L520 760" />
        </svg>
      </div>
    );
  }

  return null;
}
