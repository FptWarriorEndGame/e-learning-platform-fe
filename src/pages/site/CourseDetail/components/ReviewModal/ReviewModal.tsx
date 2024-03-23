import React, { useState, useEffect } from 'react';
import { IReview } from '../../../../../types/review.type';
import moment from 'moment';
import { Modal, Spin, Alert, Avatar, Rate, Input, Typography, Progress, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import {
  useGetReviewsByCourseIdQuery,
  useGetTotalReviewsByCourseIdQuery,
  useGetAverageRatingByCourseIdQuery,
  useGetRatingPercentageByCourseIdQuery,
  useGetReviewRepliesByReviewIdQuery
} from '../../../client.service';

interface ReviewModalProps {
  courseId: string | undefined;
  visible: boolean;
  onCancel: () => void;
}

const { Title } = Typography;

const ReviewItem: React.FC<{ review: IReview }> = ({ review }) => {
  const timeAgo = moment(review.createdAt).fromNow();
  const [showFullContent, setShowFullContent] = useState(false);
  const { data: repliesData, isLoading: isLoadingReplies } = useGetReviewRepliesByReviewIdQuery(review._id);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const contentThreshold = 300;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <Avatar src={typeof review.createdBy === 'string' ? 'N/A' : review.createdBy?.avatar} />
        <div style={{ marginLeft: 10 }}>
          <span>{typeof review.createdBy === 'string' ? review.createdBy : review.createdBy?.name ?? 'N/A'}</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rate disabled allowHalf defaultValue={review.ratingStar} />
            <span style={{ marginLeft: 20 }}>{timeAgo}</span>
          </div>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: 25 }}>
        <p style={{ marginBottom: 5 }}>
          <strong>{review.title}</strong>
        </p>
        {review.content.length > contentThreshold ? (
          <>
            <p style={{ marginBottom: 5 }}>
              {showFullContent ? review.content : `${review.content.slice(0, contentThreshold)}...`}
              <button
                onClick={handleToggleContent}
                style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
              >
                {showFullContent ? 'Show less' : 'Show more'}
              </button>
            </p>
          </>
        ) : (
          <p style={{ marginBottom: 5 }}>{review.content}</p>
        )}
        {!isLoadingReplies && repliesData && repliesData.replies.length > 0 && (
          <div style={{ marginTop: '30px', marginLeft: '30px' }}>
            {repliesData.replies.map((reply) => (
              <div key={reply._id} style={{ display: 'flex', marginBottom: 10, alignItems: 'flex-start' }}>
                <Avatar src={typeof reply.createdBy === 'string' ? 'N/A' : reply.createdBy?.avatar} />
                <div style={{ marginLeft: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ marginRight: 8, fontWeight: 'bold' }}>
                      {typeof reply.createdBy === 'string' ? 'N/A' : reply.createdBy?.name}
                    </span>
                    <span style={{ fontSize: 12, color: '#999' }}>{moment(reply.createdAt).fromNow()}</span>
                  </div>
                  <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 8 }}>
                    <p style={{ margin: 0 }}>{reply.contentReply}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ReviewModal: React.FC<ReviewModalProps> = ({ courseId, visible, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<IReview[]>([]);

  const { data, isLoading, isError } = useGetReviewsByCourseIdQuery({
    courseId: courseId!,
    params: { _q: searchTerm, _rating: selectedRating, _page: currentPage }
  });

  const {
    data: totalReviewsData,
    isLoading: totalReviewsLoading,
    isError: totalReviewsError
  } = useGetTotalReviewsByCourseIdQuery(courseId!);

  const {
    data: averageRatingData,
    isLoading: averageRatingLoading,
    isError: averageRatingError
  } = useGetAverageRatingByCourseIdQuery(courseId!);

  const {
    data: ratingPercentageData,
    isLoading: ratingPercentageLoading,
    isError: ratingPercentageError
  } = useGetRatingPercentageByCourseIdQuery(courseId!);

  useEffect(() => {
    setCurrentPage(1);
    setReviews([]);
  }, [searchTerm, selectedRating]);

  useEffect(() => {
    if (data) {
      if (currentPage > 1) {
        setReviews((prevReviews) => {
          const uniqueReviews = [...prevReviews];
          data.reviews.forEach((newReview) => {
            if (!prevReviews.some((review) => review._id === newReview._id)) {
              uniqueReviews.push(newReview);
            }
          });
          return uniqueReviews;
        });
      } else {
        setReviews(data.reviews);
      }
    }
  }, [data, currentPage]);

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const formatRatingCount = (ratingCount: number): string => {
    if (ratingCount < 1000) {
      return ratingCount.toString();
    } else if (ratingCount < 1000000) {
      return `${Math.round(ratingCount / 1000)}K`;
    } else if (ratingCount < 1000000000) {
      return `${Math.round(ratingCount / 1000000)}M`;
    } else {
      return `${Math.round(ratingCount / 1000000000)}B`;
    }
  };

  const modalTitle =
    totalReviewsData && averageRatingData
      ? `${averageRatingData.averageRating.toFixed(1)} course rating · ${formatRatingCount(
          totalReviewsData.totalReviews
        )} ratings`
      : 'Review Details';

  const renderStars = (starCount: string) => (
    <Rate disabled defaultValue={parseInt(starCount, 10)} style={{ color: '#ffc107' }} />
  );

  const renderProgress = (percentage: string) => (
    <Progress
      percent={parseInt(percentage, 10)}
      style={{ width: '100px', display: 'flex', alignItems: 'center' }}
      status='active'
      showInfo={false}
    />
  );

  const handleRatingFilter = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(undefined);
    } else {
      setSelectedRating(rating);
    }
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: '25px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <StarFilled style={{ color: '#fadb14', marginRight: '10px' }} /> {modalTitle}
        </span>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
    >
      {(isLoading || totalReviewsLoading || averageRatingLoading || ratingPercentageLoading) && <Spin size='large' />}
      {(isError || totalReviewsError || averageRatingError || ratingPercentageError) && (
        <Alert message='Error fetching data' type='error' />
      )}
      <div style={{ display: 'flex', width: '100%' }}></div>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ order: 1, width: '30%', paddingRight: '25px' }}>
          {ratingPercentageData && (
            <div style={{ marginBottom: '25px' }}>
              <Title level={4}>Rating Percentage</Title>
              <ul>
                {Object.entries(ratingPercentageData.ratingPercentages).map(([starCount, percentage]) => (
                  <li
                    key={starCount}
                    onClick={() => handleRatingFilter(parseInt(starCount))}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedRating === parseInt(starCount) ? '#f0f0f0' : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {renderProgress(percentage)}
                      {renderStars(starCount)}
                      <span style={{ marginLeft: '10px' }}>{parseInt(percentage)}%</span>
                      {selectedRating === parseInt(starCount) && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRating(undefined);
                          }}
                          style={{ marginLeft: '30px', cursor: 'pointer' }}
                        >
                          X
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Input.Search
            placeholder='Search reviews'
            onSearch={handleSearch}
            style={{ marginBottom: 10 }}
            enterButton
            allowClear
          />
        </div>
        <div style={{ order: 2, width: '70%', paddingLeft: '25px' }}>
          <div style={{ borderBottom: '1px solid #e8e8e8', marginBottom: 25 }}></div>
          {reviews.map((review: IReview) => (
            <ReviewItem key={review._id} review={review} />
          ))}
          {data && reviews.length < data.total && (
            <Button onClick={handleShowMore} style={{ marginTop: '20px' }}>
              Show more reviews
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
