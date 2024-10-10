import { Empty, Search, SkeletonCard } from "@/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { TemplateProps } from "../..";
import {
  TemplateCard,
  TemplateCards,
  TemplateContent,
  TemplateWrapper,
  Title,
} from "./style";

const TemplatesContentView = ({
  data,
  loading,
  currentTemplate,
}: {
  data: TemplateProps[];
  loading: boolean;
  currentTemplate: string;
}) => {
  const { query } = useRouter();
  const filteredData = query.q
    ? data?.filter((item: TemplateProps) =>
        item.templateTitle.toLowerCase().includes(String(query.q).toLowerCase())
      )
    : data;

  return (
    <TemplateContent>
      <TemplateWrapper>
        <Title>{currentTemplate || "All"}</Title>
        <Search />
      </TemplateWrapper>
      {filteredData.length === 0 && !loading && (
        <Empty message="No Results Found" />
      )}

      <TemplateCards>
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        {filteredData.map((item: any, index: number) => (
          <TemplateCardView
            key={index}
            // author={item?.author}
            surveyCategory={
              item?.surveyCategory?.categoryName || "Uncategorized"
            }
            templateId={item?.templateId}
            templateTitle={item?.templateTitle}
          />
        ))}
      </TemplateCards>
    </TemplateContent>
  );
};

interface prop {
  templateId: string;
  // author: string;
  surveyCategory: string;
  templateTitle: string;
}

const TemplateCardView = ({
  // author,
  surveyCategory,
  templateId,
  templateTitle,
}: prop) => {
  const { query } = useRouter();
  const projectId = query.projectid as string;

  return (
    <Link
      data-animate="opacity"
      href={
        projectId
          ? `/projects/${projectId}/survey/new/templates/${templateId}`
          : `/templates/${templateId}`
      }
    >
      <TemplateCard>
        <div className="template-card__overlay">
          <div className="template-card__overlay__button">preview</div>
        </div>
        <div className="template-card__image">
          <img src="/card-placeholder.webp" alt="template" />
        </div>
        <div className="template-card__content">
          <h3>{templateTitle}</h3>
          <p>{surveyCategory}</p>
          {/* <div className="template-card__content__avatar">
            <Avatar size="sm" />
            <span>{author ?? "Anonymous"}</span>
          </div> */}
        </div>
      </TemplateCard>
    </Link>
  );
};

export default TemplatesContentView;
