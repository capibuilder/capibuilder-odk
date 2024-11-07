import { MultiLangs } from "@/interfaces/questionFields";
import slugify from "slugify";
import xmlFormat from "xml-formatter";
import { encodeXMLString } from "./encodeXMLString";
import { MessageConstuctor } from "./messageConstuctor";
import { modifiedJsonData } from "./modifiedJsonData";

export type entity = {
  datasetName: string;
};

export type XmlProps = {
  id: string;
  type: string;
  dataAttribute: string;
  meta?: boolean;
  style: string; // "input" | "select" | "select1" | "range" | "upload";
  label?: string;
  preload?: string;
  preloadParams?: string;
  hint?: string;
  calculate?: string;
  constraint?: string;
  constraintMsg?: string;
  relevant?: string;
  required?: boolean;
  readOnly?: boolean;
  requiredMsg?: string;
  defaultValue?: string;
  appearance?: string;
  mediatype?: string;
  group?: boolean;
  groupRepeat?: boolean;
  groupLabel?: string;
  repeatCount?: string;
  groupfields: XmlProps[];
  instanceId?: string;
  parentPath: string[];
  parentId?: string | null;
  saveToEntity?: boolean;
  connectTo?: string | null;
  selectOptions?: {
    label: string;
    value: string;
    stage?: number;
    parentKey?: string;
    parentName?: string;
  }[];
  auditType?: "TEXT" | "AUDIO";
  isCascading?: boolean;
  sliderOptions?: {
    start: string;
    end: string;
    step: string;
  };
  length?: {
    max?: number;
    min?: number;
  };
  value?: {
    max?: number;
    min?: number;
  };
  dateRange?: {
    max?: number;
    min?: number;
  };
  otherLangs: MultiLangs[];
};

const ID_PREFIX = "id_";

const generateInstanceValue = (data: XmlProps): string => {
  if (data.meta) return "";
  if (data.meta ?? data.auditType === "AUDIO") {
    return `<${data.dataAttribute}/>`;
  }

  if (data.group) {
    return `
    <${data.dataAttribute}>
      ${Object.values(data.groupfields).map(generateInstanceValue).join("")}
    </${data.dataAttribute}>
  `;
  }

  if (data.defaultValue) {
    return `<${data.dataAttribute}>${data.defaultValue}</${data.dataAttribute}>`;
  }

  return `<${data.dataAttribute} />`;
};

const generateInstanceMeta = (data: XmlProps[], jsonData?: any): string => {
  const instance = data.map(v => `<${v.dataAttribute}/>`).join("");

  const entity = jsonData.entity
    ? `<entity create="1" dataset="${jsonData.entity.datasetName}" id=""><label/></entity>`
    : "";

  return `<meta>
  ${instance}
  <instanceID/>
  ${entity}
</meta>`;
};

const generateCustomInstanceValue = (data: XmlProps): string => {
  if (data.isCascading) {
    const modifiedDataAttribute =
      data.parentPath.length > 0
        ? `${data.parentPath.join("/")}/${data.dataAttribute}`
        : data.dataAttribute;
    const instance = data.selectOptions
      ?.map(
        (v, idx) => `<item>
      ${
        v.stage && v.stage > 1
          ? `<${v.parentKey}>${v.parentName}</${v.parentKey}>`
          : ""
      }
      <itextId>/data/${modifiedDataAttribute}:option${idx}</itextId>
      <name>${v.value}</name>
      </item>
      `
      )
      .join("");

    const instanceText = `<instance id=${data.dataAttribute}><root>${instance}</root></instance>`;

    return instanceText;
  }

  if (
    data.instanceId === null ||
    data.type !== "odk:rank" ||
    !data.selectOptions
  )
    return "";

  const instance = data.selectOptions
    ?.map(
      v => `
      <item>
      <label>${encodeXMLString(v.label)}</label>
      <name>${v.value}</name>
      </item>
      `
    )
    .join("");

  return `
  <instance id=${data.instanceId}>
  <root>
    ${instance}
  </root>
</instance>
  `;
};

const generateIText = (data: XmlProps): string => {
  const iText = [];
  if (data.preload) return "";

  const modifiedDataAttribute =
    data.parentPath.length > 0
      ? `${data.parentPath.join("/")}/${data.dataAttribute}`
      : data.dataAttribute;

  if (data.group) {
    if (data.label) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:label">
          <value>${encodeXMLString(data.label)}</value>
        </text>
      `);
    }

    if (data.groupfields) {
      for (const field of Object.values(data.groupfields)) {
        iText.push(generateIText(field));
      }
    }
  } else {
    if (data.label) {
      const hasOutput = data.label.includes("#");

      iText.push(`
        <text id="/data/${modifiedDataAttribute}:label">
          <value>${
            hasOutput
              ? encodeXMLString(makeOutputLabel(data.label))
              : encodeXMLString(data.label)
          }</value>
        </text>
      `);
    }

    if (data.hint) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:hint">
          <value>${encodeXMLString(data.hint)}</value>
        </text>
      `);
    }

    if (data.required) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:requiredMsg">
          <value>${encodeXMLString(
            data.requiredMsg || "This field is required!"
          )}</value>
        </text>
      `);
    }

    if (data.constraintMsg) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:constraintMsg">
          <value>${encodeXMLString(data.constraintMsg || "")}</value>
        </text>
      `);
    }

    if (
      data.style.includes("select") &&
      (data.selectOptions || []).length > 0
    ) {
      (data.selectOptions || []).forEach((option, index) => {
        iText.push(`
          <text id="/data/${modifiedDataAttribute}:option${index}">
            <value>${encodeXMLString(option.label)}</value>
          </text>
        `);
      });
    }
  }

  return iText.join("");
};

const generateIMultiLangText = (
  data: XmlProps,
  langData?: MultiLangs
): string => {
  const iText = [];
  if (data.preload || !langData) return "";

  const modifiedDataAttribute =
    data.parentPath.length > 0
      ? `${data.parentPath.join("/")}/${data.dataAttribute}`
      : data.dataAttribute;

  if (data.group) {
    if (langData.label) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:label">
          <value>${encodeXMLString(langData.label)}</value>
        </text>
      `);
    }
  } else {
    if (langData.label) {
      const hasOutput = langData.label.includes("#");

      iText.push(`
        <text id="/data/${modifiedDataAttribute}:label">
          <value>${
            hasOutput
              ? encodeXMLString(makeOutputLabel(langData.label))
              : encodeXMLString(langData.label)
          }</value>
        </text>
      `);
    }

    if (langData.hint) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:hint">
          <value>${encodeXMLString(langData.hint)}</value>
        </text>
      `);
    }

    if (data.required) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:requiredMsg">
          <value>${encodeXMLString(langData.requiredMsg || "")}</value>
        </text>
      `);
    }

    if (langData.constraintMsg) {
      iText.push(`
        <text id="/data/${modifiedDataAttribute}:constraintMsg">
          <value>${encodeXMLString(langData.constraintMsg || "")}</value>
        </text>
      `);
    }

    if (
      data.style.includes("select") &&
      (data.selectOptions || []).length > 0 &&
      langData.selectOptions.length === 0
    ) {
      (data.selectOptions || []).forEach((option, index) => {
        iText.push(`
          <text id="/data/${modifiedDataAttribute}:option${index}">
            <value>${encodeXMLString(option.label)}</value>
          </text>
        `);
      });
    } else {
      langData.selectOptions.forEach((option, index) => {
        iText.push(`
          <text id="/data/${modifiedDataAttribute}:option${index}">
            <value>${encodeXMLString(option.label)}</value>
          </text>
        `);
      });
    }
  }

  return iText.join("\n");
};

const makeOutputLabel = (label: string): string => {
  let outputLabel = label;
  // make a regex that detects if the string has a variable that start with #

  const regex = /#[a-zA-Z0-9]+/g;
  const matches = label.match(regex);

  if (matches) {
    for (const match of matches) {
      const variableName = match.slice(1);
      const output = `<output value="/data/${variableName}" />`;
      outputLabel = outputLabel.replace(match, output);
    }
  }

  return outputLabel;
};

const generateBind = (data: XmlProps): string => {
  const bindElements = [];

  const modifiedDataAttribute =
    data.parentPath.length > 0
      ? `${data.parentPath.join("/")}/${data.dataAttribute}`
      : data.dataAttribute;

  if (data.saveToEntity) {
    bindElements.push(`entities:saveto=${modifiedDataAttribute}`);
  }

  if (data.length?.max && data.length?.min) {
    bindElements.push(
      `constraint="(regex(., &quot;^.{${data.length?.min || ""},${
        data.length?.max || ""
      }}$&quot;))"`
    );
    bindElements.push(`${MessageConstuctor({ length: data.length })}`);
  }

  if (data.value?.max && data.value?.min) {
    bindElements.push(
      `constraint="${data.value.min ? `(. &gt; '${data.value.min}')` : ""} ${
        data.value.min && data.value.max ? "and" : ""
      }  ${data.value.max ? `(. &lt; '${data.value.max}')` : ""}"`
    );

    bindElements.push(`${MessageConstuctor({ value: data.value })}`);
  }

  if (data.dateRange?.max && data.dateRange?.min) {
    bindElements.push(
      `constraint="${
        data.dateRange.min ? `(. &gt; '${data.dateRange.min}')` : ""
      } ${data.dateRange.min && data.dateRange.max ? "and" : ""}  ${
        data.dateRange.max ? `(. &lt; '${data.dateRange.max}')` : ""
      }"`
    );

    bindElements.push(`${MessageConstuctor({ dateRange: data.dateRange })}`);
  }

  if (data.type) {
    bindElements.push(`type="${data.type}"`);
  }

  if (data.required) {
    bindElements.push(
      `required="true()" jr:requiredMsg="jr:itext('/data/${modifiedDataAttribute}:requiredMsg')"`
    );
  }

  if (data.readOnly) {
    bindElements.push('readonly="true()"');
  }

  if (data.calculate) {
    bindElements.push(`calculate="${data.calculate}"`);
  }

  if (data.constraint) {
    bindElements.push(`constraint="${data.constraint}"`);
  }

  if (data.constraintMsg) {
    bindElements.push(
      `jr:constraintMsg="jr:itext('/data/${modifiedDataAttribute}:constraintMsg')"`
    );
  }

  if (data.relevant) {
    bindElements.push(`relevant="${data.relevant}"`);
  }

  if (data.preload && data.preloadParams) {
    bindElements.push(
      `jr:preload="${data.preload}" jr:preloadParams="${data.preloadParams}"`
    );
  }

  if (data.auditType === "AUDIO") {
    return `
    <bind nodeset="/data/${data.dataAttribute}" type="binary"/>
    <odk:recordaudio event="odk-instance-load" odk:quality="low" ref="/data/${modifiedDataAttribute}"/>`;
  }

  if (data.auditType === "TEXT") {
    return `<bind nodeset="/data/meta/${data.dataAttribute}" odk:location-max-age="120" odk:location-min-interval="60" odk:location-priority="balanced" type="binary"/>`;
  }

  return `<bind nodeset="/data/${modifiedDataAttribute}" ${bindElements.join(
    " "
  )} />`;
};

const generateDatasetBinds = (
  data: XmlProps,
  dataset?: string,
  uniqueIdentifier?: string
): string => {
  const modifiedDataAttribute =
    data.parentPath.length > 0
      ? `${data.parentPath.join("/")}/${data.dataAttribute}`
      : data.dataAttribute;
  return `<bind ${
    data.saveToEntity ? `entities:saveto=${modifiedDataAttribute}` : ""
  } calculate="instance('${dataset}')/root/item[name= /data/${ID_PREFIX}${uniqueIdentifier} ]/${
    data.connectTo
  }" nodeset="/data/${modifiedDataAttribute}" type="string" readonly="true()"/>`;
};

const generateBody = (
  data: XmlProps,
  shouldItemset?: boolean,
  prevDataAttribute?: string,
  prevDataAttributeFull?: string
): string => {
  if (data.style === "no-body") return "";
  if (data.preload || data.meta) return "";

  const modifiedDataAttribute =
    data.parentPath.length > 0
      ? `${data.parentPath.join("/")}/${data.dataAttribute}`
      : data.dataAttribute;

  if (data.group) {
    const groupContent = Object.values(data.groupfields)
      .map((field, i) =>
        generateBody(
          field,
          i !== 0,
          Object.values(data.groupfields)[i - 1]?.dataAttribute,
          `${data.dataAttribute}/${
            Object.values(data.groupfields)[i - 1]?.dataAttribute
          }`
        )
      )
      .join("");

    if (data.groupRepeat) {
      const repeatCount = data.repeatCount ? ` jr:count="${data.repeatCount}" jr:noAddRemove="true()"` : "";
      
      return `
      <group ref="/data/${modifiedDataAttribute}">
        <label ref="jr:itext('/data/${modifiedDataAttribute}:label')"/>
        <repeat nodeset="/data/${modifiedDataAttribute}"${repeatCount}>
          ${groupContent}
        </repeat>
      </group>
    `;
    }

    return `
      <group ref="/data/${modifiedDataAttribute}">
        <label ref="jr:itext('/data/${modifiedDataAttribute}:label')"/>
        ${groupContent}
      </group>
    `;
  }

  const { style, appearance, hint, sliderOptions, mediatype } = data;

  const labelRef = `jr:itext('/data/${modifiedDataAttribute}:label')`;
  const hintRef = hint
    ? `<hint ref="jr:itext('/data/${modifiedDataAttribute}:hint')" />`
    : "";
  const appearanceRef = appearance ? `appearance="${appearance}"` : "";
  const mediaRef =
    mediatype && style === "upload" ? `mediatype="${mediatype}"` : "";
  const sliderRef =
    style === "range"
      ? `${
          sliderOptions?.start !== "" ? `start="${sliderOptions?.start}"` : ""
        } ${sliderOptions?.end !== "" ? `end="${sliderOptions?.end}"` : ""} ${
          sliderOptions?.step !== "" ? `step="${sliderOptions?.step}"` : ""
        }`
      : "";
  const selectOptionRef =
    data.style.includes("select") && (data.selectOptions || []).length > 0
      ? (data.selectOptions || [])
          .map((option, index) =>
            option.stage && option.stage === 1
              ? `
            <item>
              <label ref="jr:itext('/data/${modifiedDataAttribute}:option${index}')"/>
              <value>${encodeXMLString(option.value)}</value>
            </item>
          `
              : option.stage
              ? ""
              : ` <item>
          <label ref="jr:itext('/data/${modifiedDataAttribute}:option${index}')"/>
          <value>${encodeXMLString(option.value)}</value>
        </item>`
          )
          .join("")
      : "";

  const customInstance =
    data.instanceId && data.type === "odk:rank"
      ? `<itemset nodeset="randomize(instance('${data.instanceId}')/root/item)">
    <value ref="name"/>
    <label ref="label"/>
  </itemset>`
      : data.isCascading && shouldItemset
      ? `<itemset nodeset="instance('${
          modifiedDataAttribute.split("/")[1]
        }')/root/item[${prevDataAttribute}= /data/${prevDataAttributeFull}]">
  <value ref="name"/>
  <label ref="jr:itext(itextId)"/>
</itemset>`
      : "";

  return `<${style} ref="/data/${modifiedDataAttribute}" ${sliderRef} ${mediaRef} ${appearanceRef}>
      <label ref="${labelRef}"/>
      ${hintRef} 
      ${selectOptionRef}
      ${customInstance}
    </${style}>`;
};

const generateXml = ({
  jsonData,
  minify,
}: {
  jsonData: {
    title: string;
    fields: XmlProps[];
    entity?: entity;
    langs?: string[];
    dataset?: null | string;
    uniqueIdentifier?: null | string;
  };
  minify?: boolean;
}) => {
  const version = Math.floor(Math.random() * 10000000);
  const { fields, entity, dataset, uniqueIdentifier } = jsonData;

  const modifiedFields: XmlProps[] = Object.values(modifiedJsonData(fields));

  const metaTrue = generateInstanceMeta(
    modifiedFields.filter(field => field.meta),
    jsonData
  );

  const instanceData = modifiedFields.map(generateInstanceValue).join("");

  const attachmentDataset = dataset
    ? `<instance id="${dataset}" src="jr://file-csv/${dataset}.csv"/>`
    : "";

  const customInstanceData = modifiedFields
    .map(field =>
      field.group
        ? Object.values(field.groupfields).map(groupField =>
            generateCustomInstanceValue(groupField)
          )
        : generateCustomInstanceValue(field)
    )
    .flat()
    .join("");

  const pushableBind = entity
    ? '<bind calculate="1" nodeset="/data/meta/entity/@create" readonly="true()" type="string"/> <bind nodeset="/data/meta/entity/@id" readonly="true()" type="string"/> <setvalue event="odk-instance-first-load" readonly="true()" ref="/data/meta/entity/@id" type="string" value="uuid()"/> <setvalue event="odk-instance-first-load" readonly="true()" ref="/data/meta/entity/label" type="string" value="uuid()"/>'
    : "";

  const iTextData = modifiedFields.map(generateIText).join("");

  const bindData =
    Object.values(fields)
      .map(field =>
        field.connectTo
          ? generateDatasetBinds(
              field,
              dataset || undefined,
              uniqueIdentifier || undefined
            )
          : generateBind(field)
      )
      .join("") + pushableBind;

  const datasetBindsForIdentifier = uniqueIdentifier
    ? `<bind nodeset="/data/${ID_PREFIX}${uniqueIdentifier}" required="true()" type="string"/> `
    : "";

  const entitySelector =
    uniqueIdentifier && dataset
      ? `<select1 appearance="autocomplete minimal" ref="/data/${ID_PREFIX}${uniqueIdentifier}">
  <label>Select previous record</label>
  <itemset nodeset="instance('${dataset}')/root/item">
      <value ref="name"/>
      <label ref="${uniqueIdentifier}"/>
  </itemset>
</select1>`
      : "";

  const bodyData = modifiedFields
    .map(field => generateBody(field, false))
    .join("");

  const multiLangiTextData = jsonData.langs
    ?.map(lang => {
      const iTextData = modifiedFields
        .map(field => {
          return field.group
            ? `  ${generateIMultiLangText(
                field,
                field.otherLangs?.find(subField => subField.lang === lang)
              )} ${Object.values(field.groupfields).map(groupField =>
                generateIMultiLangText(
                  groupField,
                  groupField.otherLangs?.find(
                    subField => subField.lang === lang
                  )
                )
              )}`
            : generateIMultiLangText(
                field,
                field.otherLangs?.find(subField => subField.lang === lang)
              );
        })
        .join("");

      return `<translation lang="${lang}">${iTextData}</translation>`;
    })
    .join("");

  const xmlData = `
  <?xml version="1.0"?>
  <h:html xmlns="http://www.w3.org/2002/xforms" ${
    entity ? 'xmlns:entities="http://www.opendatakit.org/xforms/entities"' : ""
  } xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:h="http://www.w3.org/1999/xhtml" xmlns:jr="http://openrosa.org/javarosa" xmlns:odk="http://www.opendatakit.org/xforms" xmlns:orx="http://openrosa.org/xforms" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <h:head>
      <h:title>${encodeXMLString(jsonData.title)}</h:title>
      <model ${
        entity ? 'entities:entities-version="2022.1.0"' : ""
      } odk:xforms-version="1.0.0">
        <instance>
        <data id="${slugify(jsonData.title, {
          lower: false,
        })}" version="${version}">
        ${metaTrue}
        ${uniqueIdentifier ? `<${ID_PREFIX}${uniqueIdentifier}/>` : ""}
          ${instanceData}
        </data>
        </instance>
        ${customInstanceData}
        <itext>
        <translation lang="English">
        ${iTextData}
        </translation>
        ${multiLangiTextData}
        </itext>
        ${attachmentDataset}
        <bind nodeset="/data/meta/instanceID" type="string" readonly="true()" jr:preload="uid"/>
        ${dataset ? datasetBindsForIdentifier : ""}
        ${bindData}
      </model>
    </h:head>
    <h:body>
    ${entitySelector}
      ${bodyData}
    </h:body>
  </h:html>
`;

  if (minify) {
    return xmlFormat.minify(xmlData);
  }

  return xmlFormat(xmlData);
};

export default generateXml;
